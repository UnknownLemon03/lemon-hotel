'use client'
import { getAllBookingsUser } from '@/backend/database';
import { BookingsTypeDB } from '@/backend/Types';
import { getDate } from '@/backend/util';
import Recipte from '@/components/Recipte';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'


export default function Table(){
    const [data,setData] = useState<BookingsTypeDB[]>([])
    const [range,setRange] = useState<number>(0);
    const [loading,setLoading]=useState(false);
    const [latest,setLatest] = useState(false);
    const [disableLoadMore,setDisableLoadMore] = useState(false);
    function fetchMore(){
        setLoading(true);
        getAllBookingsUser({start:range,limit:10}).then(e=>{
            setRange(count => count+e.data.length)
            if(e.data){
                if(e.data.length == 0) setDisableLoadMore(true)
                setData(data=>data.concat(...e.data))
            }
            setLoading(false);
        })
    }
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    useEffect(()=>{
        fetchMore()
    },[])
    const FilteredData = data.filter(e=>{
        if (latest) 
            return e.end.getTime() < today.getTime();
        else 
            return e.end.getTime() >= today.getTime();
          
    })
    return<>
        <button onClick={()=>setLatest(e=>!e)} type="button" className="text-white bg-blue-700 hover:bg-blue-800  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            {latest ? "Current Booking" : "Old Bookings"}
        </button>
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
                  {FilteredData.length > 0 && <>
                      {FilteredData.map((e,i)=><TableRow data={e} key={i}/>)}
                          {!disableLoadMore && <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                              <td colSpan={4} onClick={fetchMore} className="px-6 py-4 text-center cursor-pointer">
                                  {!loading && "Load More" }
                                  <div className='w-full h-full flex justify-center'>
                                      {loading && <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                      </svg>}
                                  </div>
                              </td>
                          </tr>}
                      </>}
                      {FilteredData.length == 0 &&<>
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                              <td colSpan={4} className="px-6 py-4 text-center ">
                                  No Bookings
                              </td>
                          </tr>
                      </>}
              </tbody>
            </table>    
        </div>
    </>
}


function TableRow({data,Actions}:{key?:number,data:BookingsTypeDB,Actions?:()=>React.Component}) {
    const [hide,setHide] = useState(false)
    console.log("booking id",data.id)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let status: string = "";

    const startDate = new Date(data.start);
    const endDate = new Date(data.end);
    let color = 0;
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    if (endDate.getTime() < today.getTime()) status = "";
    else if (startDate.getTime() <= today.getTime() && endDate.getTime() >= today.getTime())status = "(ongoing)",color = 1;
    else if (startDate.getTime() > today.getTime()) status = "(upcoming)",color = 2;
    
    return (
        <>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {data.name} <span className={`${color == 2 && "text-green-500"} ${color == 1 && "text-red-500"}`}>{status}</span>
                    </th>
                    <td className="px-6 py-4">
                        {getDate(data.start)}
                    </td>
                    <td className="px-6 py-4">
                    {getDate(data.end)}
                    </td>
                    <td className="px-6 py-4">
                            {startDate.getTime() > today.getTime() && <Link href={`/dashboard/bookings?hotelID=${data.id}`} className={`font-medium text-green-500 mr-2 cursor-pointer`}>
                                Edit
                            </Link>}
                       {hide && <Recipte Booking={data} close={setHide}/>}
                        <span className={`font-medium text-gray-600 mr-2 cursor-pointer `} onClick={()=>setHide(true)}>View</span>
                    </td>
            </tr>
            
        </>
  )
}
