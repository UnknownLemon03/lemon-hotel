import React from 'react'
import TableRow from './TableRow'
import Navbar from '@/components/Navbar'
import { redirect } from 'next/navigation';
import { GetJWTSession } from '@/backend/Auth';

export default async function page() {
        const token = await GetJWTSession();
        if(!token) return redirect("/auth");
        const data = Array(10).fill(1);
    return (
    <>
      <h3 className="text-3xl font-bold dark:text-white mb-5">Bookings</h3>
      <div className="h-[88%] overflow-scroll scrollbar-hide ">
          <table className="w-full text-sm  text-left rtl:text-right text-gray-500 dark:text-gray-400 relative rounded-xl">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          Hotel Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                          From
                      </th>
                      <th scope="col" className="px-6 py-3">
                          To
                      </th>
                      <th scope="col" className="px-3 py-3">
                          Action
                      </th>
                  </tr>
              </thead>
              <tbody>
                  {data.map((e,i)=><TableRow key={i}/>)}
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td colSpan={4} className="px-6 py-4 text-center cursor-pointer">
                            Load More 
                        </td>
                    </tr>
              </tbody>
            </table>    
        </div>
    
    </>
  )
}
