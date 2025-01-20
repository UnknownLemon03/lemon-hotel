'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import QR from './QR'
import AddNewBooking from './AddNewBooking'
import { HotelTypeDB } from '@/backend/Types'
import Slider from './Slider'

export default function Card({data}:{data:HotelTypeDB}) {
    const [qr,setQr] = useState(false)
    const [show,setShow] = useState(false);
  return (
   <>
    <div className="relative flex flex-col  bg-white shadow-sm border border-slate-200 mx-auto rounded-lg w-full min-w-[300px] max-w-[300px]">
        {qr && <QR  url={'https://chatgpt.com/c/678a6b62-8540-8009-adb9-b9c0f96ebec2'} name={data.name} close={()=>setQr(false)} />}
       {!qr &&<> <div className="relative h-fit m-2.5 overflow-hidden text-white rounded-md">
          
            <Slider/>
        </div>
        <div className="p-4">
            <h6 className="mb-2 text-slate-800 text-xl font-semibold">
                {data.name}
            </h6>
            <p className="text-slate-600 leading-normal font-light">
                {`${data.city} ${data.state} ${data.pincode}`}
            </p>
        </div>
        <div className="px-4 pb-4 pt-0 mt-2 flex justify-around">
            <button onClick={()=>{setShow(e=>!e)}} className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                Book 
            </button>
            <div onClick={()=>{setQr(true)}} className='cursor-pointer  hover:bg-black/20 rounded-lg'>
                <Image src={"/QR.png"} alt='QR code'  width={50} height={50}/>
            </div>
        </div></>}
    </div>  
    {show && <AddNewBooking hotelid={data.id} close={setShow}/>}
   </>
  )
}
