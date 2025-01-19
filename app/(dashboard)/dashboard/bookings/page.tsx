import React from 'react'
import { redirect } from 'next/navigation';
import { GetJWTSession } from '@/backend/Auth';
import Table from './Table';

export default async function page() {
        const token = await GetJWTSession();
        if(!token) return redirect("/auth");
    return (
    <>
      <h3 className="text-3xl font-bold dark:text-white mb-5">Bookings</h3>
      <div className="h-[88%] overflow-scroll scrollbar-hide rounded-lg">
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
                  <Table/>
              </tbody>
            </table>    
        </div>
    
    </>
  )
}
