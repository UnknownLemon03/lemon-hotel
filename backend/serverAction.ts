'use server'

import { PreviewData } from "next";
import { BookingsType, HotelType } from "./Types";
import { AddHotel, DeleteHotel } from "./database";
import { revalidatePath } from "next/cache";
import { isLogin } from "./Auth";

export async function AddNewHotelServerAction(formData:PreviewData,FromData:FormData):Promise<{error:string,success:boolean}>{
    try{
        
        const data:HotelType ={
            name:FromData.get("name") as string,
            area:FromData.get("area") as string,
            city:FromData.get("city") as string,
            state:FromData.get("state") as string,
            url:FromData.get("url") as string,
            pincode:parseInt(FromData.get("pincode") as string),
            images:['some ramdon url'],
        }
        console.log(data)
        await new Promise((res,err)=>{ setTimeout(()=>res(true),1000)})
        const req = await AddHotel(data);
        console.log(req)
        revalidatePath("/dashboard/hotels")
        return req
    }catch(e){
        console.log(e)
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
        console.log(e)
        if(e instanceof Error){
            return {error:`${e.message}`,success:false}
        }
        return {error:"Logout fail",success:false}
    }
}

export async function AddBookingServerAction(formData:PreviewData,FromData:FormData):Promise<{error:string,success:boolean}>{
    try{
        // const session  = await isLogin();
        // if(!session) throw new Error("Not Signed in")
        const hotelid = FromData.get('hostel_id') as string;
        // if(!hotelid) throw new Error("Not Signed in")
        const data: BookingsType = {
            userid:1,
            name: FromData.get("name") as string,
            email: FromData.get("email") as string,
            id_number: FromData.get("id_number") as string,
            number: FromData.get("number") as string,
            address: FromData.get("address") as string,
            purpose: FromData.get("purpose") as string,
            start: new Date(FromData.get("start") as string),  
            end: new Date(FromData.get("end") as string),     
            hotel_name: 'sdf',  
            hotel_address: 'df', 
        };
          console.log(data)
        return {success:true,error:""};
    }catch(e){
        console.log(e)
        if(e instanceof Error){
            return {error:`${e.message}`,success:false}
        }
        return {error:"Logout fail",success:false}
    }
}