import React from 'react'
import Navbar from '@/components/Navbar'
import { getAllHotels } from '@/backend/database'
import AddHotel from '@/components/AddHotel';
import { TableRow } from './TableRow';
import AddNewBooking from '@/components/AddNewBooking';

export default async function page() {
    const {data} = await getAllHotels();
  return (
    <>
        <h3 className="text-3xl font-bold dark:text-white mb-5">Bookings</h3>
        <AddHotel/>

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
            {data.length == 0 &&<>
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


