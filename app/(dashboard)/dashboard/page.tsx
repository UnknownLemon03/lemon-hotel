'use server'
import { GetJWTSession } from '@/backend/Auth'
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function page() {
  const token = await GetJWTSession();
  if(!token) return redirect("/auth");
  return (
    <div className='flex justify-center items-center'>
      <Image src={"/dashboard.png"} height={500} width={500} alt="Dashboard"/>
    </div>
  )
}
