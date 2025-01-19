'use client'
import React, { useEffect, useState } from 'react'
import qrcode from "qrcode"
import Image from 'next/image';
export default function QR({url,name,close}:{name:string,url:string,close?:(e?:any)=>void}) {
    const [qrCodeData, setQrCodeData] = useState<string | null>(null);
    if(!close) close = ()=>{}
    useEffect(()=>{
        qrcode.toDataURL(url)
        .then((dataUrl) => {
          setQrCodeData(dataUrl);
        })
        .catch((err) => {
          console.error('Error generating QR code:', err);
        });
    },[])
   
  return <>
  <div className='w-full h-full flex justify-center items-center  pt-4 flex-col' onMouseLeave={close}>
            {qrCodeData ? (<>
                <Image
                    className="border border-black rounded-lg"
                    height={200}
                    width={200}
                    src={qrCodeData}
                    alt="QR Code"
                />
                <p className='mt-2'>{name}</p>
                <a href={url} target='_blank' className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Website
                </a>

                </>
            ) : (
                <p>Generating QR Code...</p>
            )}
  </div>
</>
}
