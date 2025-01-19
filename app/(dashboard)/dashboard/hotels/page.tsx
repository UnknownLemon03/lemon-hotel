import React from 'react'
import Navbar from '@/components/Navbar'
import { getAllHotels } from '@/backend/database'
import AddHotel from '@/components/AddHotel';
import { TableRow } from './TableRow';
import AddNewBooking from '@/components/AddNewBooking';
import { GetJWTSession } from '@/backend/Auth';
import { redirect } from 'next/navigation';
import QR from '@/components/QR';
import Image from 'next/image';
import Link from 'next/link';
import { HotelTypeDB } from '@/backend/Types';

export default async function page({ searchParams }:{ searchParams:{hotelID:string} }) {
    const token = await GetJWTSession();
    const {hotelID} = await searchParams;
    if(!token) return redirect("/auth");
    const {data} = await getAllHotels();
    let hotelData:HotelTypeDB|null = null;
    console.log(hotelID)
    if(!isNaN(parseInt(hotelID))){
        const req = await getAllHotels(parseInt(hotelID));
        if(req.success && req.data.length > 0){
            hotelData = req.data[0];
        }
    }
  return (
    <>
        <h3 className="text-3xl font-bold dark:text-white mb-5">Hotels</h3>
        <AddHotel/>
        {hotelData && <>
            <div  
                className={`overflow-clip z-10 backdrop-blur-3xl w-full h-full fixed top-0 left-[0%]`} 
            />
            <div className="z-10 fixed top-[25%] flex-col  left-0 mx-auto w-full p-2 flex items-center justify-center max-h-screen">
                <div className="p-4 relative bg-white rounded shadow-lg ring ring-indigo-600/50">
                <Link href={"/dashboard/hotels"}>
                    <Image className='absolute -top-6 -left-6 cursor-pointer' src={"/close.svg"}  height={30} width={30} alt='Close'/>
                </Link>
                <QR url={hotelData.url} name={hotelData.name} />
                </div>
            </div>
        </>}

        <div className="h-[88%] overflow-scroll scrollbar-hide ">
            <table className="w-full text-sm  text-left rtl:text-right text-gray-500 dark:text-gray-400  rounded-xl">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        No.
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Hotel Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Address 
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
            {data?.map((hotel, index) => <TableRow key={index} data={hotel} />)}
            {data.length == 0 && <>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td colSpan={4} className="px-6 text-center py-4">
                        No Hotel
                    </td>
                </tr>
            </>}
            </tbody>
            </table>    
        </div>
    </>
  )
}


