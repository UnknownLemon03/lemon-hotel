'use client'
import { CldUploadWidget } from 'next-cloudinary';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

export default function ImageUpload({setUrl}:{setUrl:Dispatch<SetStateAction<string[]>>}) {
    const[open,setOpen] = useState<any>(null)
    useEffect(()=>{
        if(open){
            open()
        }
    },[])
    return (
    <>
        <CldUploadWidget
        uploadPreset="lemon_hotel"
        onSuccess={(result) => {
          if (
            result.event === 'success' &&
            result.info &&
            typeof result.info !== 'string' &&
            result.info.secure_url
          ) {
            const secureUrl = result.info.secure_url;
            setUrl(e=>[...e,secureUrl])
          }
        }}
      >
        {({ open }) => {
          return (
            <button onClick={() => open()} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Upload Images
            </button>
          );
        }}
      </CldUploadWidget>
    </>
  )
}
