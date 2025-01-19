'use client'
import { DeleteHotelServerAction } from "@/backend/serverAction";
import { HotelTypeDB } from "@/backend/Types";
import Link from "next/link";
import { startTransition, useActionState } from "react";

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
        <span className="font-medium text-green-500 mr-2 cursor-pointer">Edit</span>
        <Link href={`/dashboard/hotels?hotelID=${data.id}`}>
          <span className="font-medium text-gray-500 mr-2 cursor-pointer">QR</span>
        </Link>
      </td>
    </tr>
  );
}