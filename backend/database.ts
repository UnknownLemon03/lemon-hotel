'use server'
import { PrismaClient } from '@prisma/client';
import { BookingsType, BookingsTypeDB, HotelType, HotelTypeDB } from './Types';
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

export async function getAllBookingsUser(id:number):Promise<{error:string,success:boolean,data:BookingsTypeDB[]}>{
    try{
        const data = await prisma.bookings.findMany({
            where:{
                id
            }
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

export async function getAllHotels():Promise<{error:string,success:boolean,data:HotelTypeDB[]}>{
    try{
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
        return {error:"Error Creating Room",success:false,data:[]}
    }
}