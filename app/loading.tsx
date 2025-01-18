import Image from 'next/image'
import React from 'react'

export default function Loading() {
  return (
    <div className="h-screen w-full ">
        <Image className="absolute top-[45%] left-[46%]" alt="loading" src={'/loading.gif'} unoptimized width={150} height={150}/>
    </div>
  )
}
