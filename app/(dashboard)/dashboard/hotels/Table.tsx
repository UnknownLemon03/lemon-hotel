'use client'
import { DeleteHotelServerAction } from "@/backend/serverAction";
import { HotelTypeDB } from "@/backend/Types";
import Search from "@/components/Search";
import Link from "next/link";
import { startTransition, useActionState, useState } from "react";

export function Table({ data }: { data: HotelTypeDB[] }){
  const [search,setSearch] = useState("")
  return<>
    <Search delay={100} setSearch={setSearch}/>
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
            {search=="" && data?.map((hotel, index) => <TableRow key={index} data={hotel} />)}
            {search!="" && data.filter(e=>e.name.toLowerCase().includes(search.toLowerCase()))?.map((hotel, index) => <TableRow key={index} data={hotel} />)}
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
}


export function TableRow({ data }: { data: HotelTypeDB }) {
    const [prev, action] = useActionState(DeleteHotelServerAction,{error:"",success:false})
    function handleDelete(){
        startTransition(()=>{
            const req = new FormData();
            req.set("id",`${data.id}`)
            action(req)
        })
    } 
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4">
        {data.id}
      </td>
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {data.name}
      </th>
      <td className="px-6 py-4">
        {data.city}
      </td>
      <td className="px-6 py-4">
        <span onClick={handleDelete} className="font-medium text-red-600 mr-2 cursor-pointer">Delete</span>
        <Link href={`/dashboard/hotels?hotelID=${data.id}`}>
          <span className="font-medium text-gray-500 mr-2 cursor-pointer">QR</span>
        </Link>
      </td>
    </tr>
  );
}