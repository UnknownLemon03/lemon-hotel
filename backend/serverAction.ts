"use server"

import { PreviewData } from "next";
import { BookingsType, BookingsTypeDB, HotelType } from "./Types";
import { AddHotel, AddHotelBooking, DeleteHotel, getAllHotels, LoginUser, SignUpUser, ToogleAdmin, UpdatingBooking } from "./database";
import { revalidatePath } from "next/cache";
import { CreateJWTSession, isAdmin, isLogin } from "./Auth";

export async function AddNewHotelServerAction(formData:PreviewData,FromData:FormData):Promise<{error:string,success:boolean}>{
    try{
        
        const data:HotelType ={
            name:FromData.get("name") as string,
            area:FromData.get("area") as string,
            city:FromData.get("city") as string,
            state:FromData.get("state") as string,
            url:FromData.get("url") as string,
            pincode:parseInt(FromData.get("pincode") as string),
            images:JSON.parse(FromData.get("images") as string),
        }
        console.log(data)
        const req = await AddHotel(data);
        if(req.success)
            revalidatePath("/dashboard/hotels")
        return req
    }catch(e){
        if(e instanceof Error){
            return {error:`${e.message}`,success:false}
        }
        return {error:"Logout fail",success:false}
    }
}

export async function DeleteHotelServerAction(formData:PreviewData,FromData:FormData):Promise<{error:string,success:boolean}>{
    try{
        const id = parseInt(FromData.get("id") as string);
        if(isNaN(id))
                throw Error("Not valid ID")
        
        const req = await DeleteHotel(id);
        revalidatePath("/dashboard/hotels")
        return req;
    }catch(e){
        if(e instanceof Error){
            return {error:`${e.message}`,success:false}
        }
        return {error:"Logout fail",success:false}
    }
}

export async function AddBookingServerAction(formData:PreviewData,FromData:FormData):Promise<{error:string,success:boolean}>{
    try{
        const session  = await isLogin();
        if(!session) throw new Error("Not Signed in")
        const hotelid = parseInt(FromData.get('hostel_id') as string);
        if(isNaN(hotelid)) throw new Error("Not Signed in")
        const hotel =await getAllHotels(hotelid);
        if(!hotel.data) throw new Error("Hotel not found")
        const data: BookingsType = {
            userid:session.id,
            name: FromData.get("name") as string,
            email: FromData.get("email") as string,
            id_number: FromData.get("id_number") as string,
            number: FromData.get("number") as string,
            address: FromData.get("address") as string,
            purpose: FromData.get("purpose") as string,
            start: new Date(FromData.get("start") as string),  
            end: new Date(FromData.get("end") as string),     
            hotel_id: hotelid,  
            hotel_name: hotel.data[0].name,  
            hotel_address: `${hotel.data[0].city}, ${hotel.data[0].state}, ${hotel.data[0].pincode}, ${hotel.data[0].area}`, 
        };
        if (!(data.start instanceof Date) || isNaN(data.start.getTime())) {
            throw new Error("Invalid start date");
        }
        if (!(data.end instanceof Date) || isNaN(data.end.getTime())) {
            throw new Error("Invalid end date");
        }
        const req = await AddHotelBooking(data)
        return req;
    }catch(e){
        if(e instanceof Error){
            return {error:`${e.message}`,success:false}
        }
        return {error:"Logout fail",success:false}
    }
}

export async function LoginServerAction(formData:PreviewData,FromData:FormData):Promise<{error:string,success:boolean}>{
    try{
        const user = {
            email:FromData.get("email") as string,
            password:FromData.get("password") as string,
            id:0,
            admin:false
        }
        const req =  await LoginUser(user);
        if(!req.success){
            throw Error("Error Logining In")
        }
        await CreateJWTSession(req.data!)
        return {success:req.success,error:req.error};
    }catch(e){
        if(e instanceof Error){
            return {error:`${e.message}`,success:false}
        }
        return {error:"Logout fail",success:false}
    }
}
export async function SignUpServerAction(formData:PreviewData,FromData:FormData):Promise<{error:string,success:boolean}>{
    try{
        const user = {
            email:FromData.get("email") as string,
            password:FromData.get("password") as string,
            id:0,
            admin:false
        }
        const req =  await SignUpUser(user);
        if(!req.success){
            throw Error("Error Logining In")
        }
        await CreateJWTSession(req.data!)
        return {success:req.success,error:req.error};
    }catch(e){
        if(e instanceof Error){
            return {error:`${e.message}`,success:false}
        }
        return {error:"Logout fail",success:false}
    }
}

export async function BookingEditsServerAction(formData:PreviewData,FromData:FormData):Promise<{error:string,success:boolean}>{
    try{
        const session  = await isLogin();
        if(!session) throw new Error("Not Signed in")
        const hotelid = parseInt(FromData.get('hotel_id') as string);
        if(isNaN(hotelid)) throw new Error("Not Valid hotel id")
        console.log(FromData.get("id"))
        if(isNaN(parseInt(FromData.get("id") as string))) throw new Error("Booking not found")
        const data: BookingsTypeDB = {
            id:parseInt(FromData.get("id") as string),
            userid:session.id,
            name: FromData.get("name") as string,
            email: FromData.get("email") as string,
            id_number: FromData.get("id_number") as string,
            number: FromData.get("number") as string,
            address: FromData.get("address") as string,
            purpose: FromData.get("purpose") as string,
            start: new Date(FromData.get("start") as string),  
            end: new Date(FromData.get("end") as string),     
            hotel_id: hotelid,  
            hotel_name: "",  
            hotel_address: "", 
        };
        if (!(data.start instanceof Date) || isNaN(data.start.getTime())) {
            throw new Error("Invalid start date");
        }
        if (!(data.end instanceof Date) || isNaN(data.end.getTime())) {
            throw new Error("Invalid end date");
        }
        const req = await UpdatingBooking(data)
        if(req.success){
            revalidatePath('/dashboard/bookings')
        }
        console.log(data)
        return req;
    }catch(e){
        if(e instanceof Error){
            return {error:`${e.message}`,success:false}
        }
        return {error:"Logout fail",success:false}
    }
}

export async function ToogleAdminServerAction(formData:PreviewData,FromData:FormData):Promise<{error:string,success:boolean}>{
    try{
        const data = {
            id:parseInt(FromData.get("id") as string),
            admin:FromData.get("admin") as string == 'true' ? true : false,
        }
        if(isNaN(data.id)) throw new Error("Invalid ID")
        const session = await isLogin()
        const Admin = await isAdmin()
        if(!session) throw new Error("User not Sign in")
        if(!Admin) throw new Error("Not Authorized")
        const req = await ToogleAdmin(data);
        return {success:req.success,error:req.error};
    }catch(e){
        if(e instanceof Error){
            return {error:`${e.message}`,success:false}
        }
        return {error:"Logout fail",success:false}
    }
}