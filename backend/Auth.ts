'use server'
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import { PrismaClient } from '@prisma/client';
import { UserTypeDB } from "./Types";
import { GetUser } from "./database";
import { revalidatePath } from "next/cache";
const prisma  = new PrismaClient();
export async function CreateJWTSession(e:UserTypeDB){
    const data = {
        id:e.id,
        email:e.email,
    }
    console.log(process.env.NEXT_JWT_SECRETE)
    const token = jwt.sign(data,process.env.NEXT_JWT_SECRETE!,{expiresIn:"12h"});
    const cookieStore = await cookies();
    cookieStore.set("AUTH",token,{expires:new Date(Date.now()+1000*60*60*12)})
}

export async function GetJWTSession():Promise<{data:null|string | jwt.JwtPayload,error:boolean}>{
    const cookieStore = await cookies();
    const token = cookieStore.get("AUTH");
    if(token){
        const {value} = token;
        const res = jwt.verify(value,process.env.NEXT_JWT_SECRETE!)
        return {data:res,error:false};
    }
    return {data:null,error:true};
}

export async function LogOut(){
    'use client'
    const cookieStore = await cookies();
    cookieStore.delete("AUTH");
}


export async function isLogin():Promise<undefined|null|{id:number,name:string}>{
    const cookie = await cookies();
    const token = cookie.get("AUTH");
    if(token && token.value){ 
        const data = jwt.verify(token.value,process.env.NEXT_JWT_SECRETE as string) as {id:number,name:string}
        return data;
    }
    return null;
}

export async function isAdmin():Promise<boolean>{
    const data = await isLogin()
    if(!data) return false;
    const user = await GetUser(data.id)
    if(!user.data) return false;
    return user.data?.admin
}
