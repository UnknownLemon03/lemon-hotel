"use server"
import { PrismaClient } from '@prisma/client';
import { BookingsType, BookingsTypeDB, HotelType, HotelTypeDB, UserTypeDB } from './Types';
import bcrypt from "bcrypt"
import { isLogin } from './Auth';
const prisma  = new PrismaClient();

export async function AddHotel(data:HotelType):Promise<{error:string,success:boolean}>{
    try{
        console.log(data,'asdflkasdjfalksdjfalskdfjasdlk')
        const req = await prisma.hotel.create({
            data: {
              name: data.name,
              city: data.city,
              state: data.state,
              pincode: data.pincode,
              area: data.area,
              url:data.url
            //   images: {
            //     create: data.images.map((url) => ({ url })),
            //   },
            },
          });
        return {success:true, error:""}
    }catch(e){
        console.log(e)
        return {error:"Error Creating Room",success:false}
    }
}

export async function DeleteHotel(id:number):Promise<{error:string,success:boolean}>{
    try{
        // delete images from cloudinary too 
        await prisma.hotel.delete({
            where:{
                id
            }
        })
        return {success:true, error:""}
    }catch(e){
        return {error:"Error Creating Room",success:false}
    }
}

export async function UpdateHotel(data:HotelTypeDB):Promise<{error:string,success:boolean}>{
    try{
       // i will work ont his later 
        return {success:true, error:""}
    }catch(e){
        return {error:"Error Creating Room",success:false}
    }
}

export async function AddBookings(data:BookingsType):Promise<{error:string,success:boolean}>{
    try{
        await prisma.bookings.create({
            data
        })
        return {success:true, error:""}
    }catch(e){
        return {error:"Error Creating Room",success:false}
    }
}

export async function getAllBookingsUser({start=0,limit=10}:{start:number,limit:number}):Promise<{error:string,success:boolean,data:BookingsTypeDB[]}>{
    try{
        const session = await isLogin()
        if(!session) throw new Error("User not Sign in")
        const data = await prisma.bookings.findMany({
            where:{
                userid:session.id
            },
            skip:start,
            take:limit
        })
        return {success:true, error:"",data}
    }catch(e){
        return {error:"Error Creating Room",success:false,data:[]}
    }
}

export async function getAllBookingsHotel(hotel_id:number):Promise<{error:string,success:boolean,data:BookingsTypeDB[]}>{
    try{
        const data = await prisma.bookings.findMany({
            where:{
                hotel_id
            }
        })
        return {success:true, error:"",data}
    }catch(e){
        return {error:"Error Creating Room",success:false,data:[]}
    }
}

export async function getAllHotels(hotelid?:number):Promise<{error:string,success:boolean,data:HotelTypeDB[]}>{
    try{
        if(hotelid){
            const req = await prisma.hotel.findFirst({
                where:{id:hotelid},
                include:{
                    images:true
                }
            })
            if(!req) throw new Error("Can't find hotel")
            const data = [{
                    id:req.id,
                    name: req.name,
                    city:req.city,
                    state:req.state,
                    pincode:req.pincode,
                    area:req.area,
                    images:req.images.map(req=>req.url),
                    url:req.url,
                }]

            return {success:true,error:"",data}
        }
        const req = await prisma.hotel.findMany({
            include:{
                images:true
            }
        });
        
        const data = req.map(e=>{
            return {
                id:e.id,
                name: e.name,
                city:e.city,
                state:e.state,
                pincode:e.pincode,
                area:e.area,
                images:e.images.map(e=>e.url),
                url:e.url,
            }
        })
        return {success:true, error:"",data}
    }catch(e){
        return {error:"Error Getting Hotels",success:false,data:[]}
    }
}

export async function SignUpUser(data:UserTypeDB):Promise<{error:string,success:boolean,data:UserTypeDB|null}>{
    try{
        const hashPassword = bcrypt.hashSync(data.password,12);
        const req = await prisma.user.create({
            data:{
                email:data.email,
                password:hashPassword,
                admin:false,
            }
        })
        return {success:true, error:"",data:req}
    }catch(e){
        if(e instanceof Error){
            return {error:e.name+": "+e.message,success:false,data:null}
        }
        return {error:"Error Signing Up",success:false,data:null}
    }
}

export async function LoginUser(data:UserTypeDB):Promise<{error:string,success:boolean,data:UserTypeDB|null}>{
    try{
        const user = await prisma.user.findFirst({
            where:{
                email:data.email
            }
        })
        if(!user) throw Error("No User found");
        const success = bcrypt.compareSync(data.password,user.password)
        return {success:success, error:success?"":"Invalid Credentials",data:user}
    }catch(e){
        if(e instanceof Error){
            return {error:e.name+": "+e.message,success:false,data:null}
        }
        return {error:"Error Login in",success:false,data:null}
    }
}

export async function GetUser(id:number):Promise<{error:string,success:boolean,data:UserTypeDB|null}>{
    try{
        const user = await prisma.user.findFirst({
            where:{
                id
            }
        })
        if(!user) throw Error("No User found");
        return {success:true, error:"",data:user}
    }catch(e){
        if(e instanceof Error){
            return {error:e.name+": "+e.message,success:false,data:null}
        }
        return {error:"User not found",success:false,data:null}
    }
}

export async function AddHotelBooking(data:BookingsType):Promise<{error:string,success:boolean}>{
    try{
        const req = await prisma.bookings.create({
            data
        })
        return {success:true, error:""}
    }catch(e){
        if(e instanceof Error){
            return {error:e.name+": "+e.message,success:false}
        }
        return {error:"User not found",success:false}
    }
}