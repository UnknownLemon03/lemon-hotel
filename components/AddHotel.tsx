'use client'
import { AddNewHotelServerAction } from '@/backend/serverAction';
import { HotelType } from '@/backend/Types';
import { Hotel } from '@prisma/client';
import React, { startTransition, useActionState, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function AddHotel() {
    const [show,setShow] = useState(false);
    const [preState,action,isPending] = useActionState(AddNewHotelServerAction,{error:"",success:false})
    const FormFileds =[
        {name:"name",placeholder:"Hotel Name",lable:"Hotel Name",type:"text"},
        {name:"city",placeholder:"City Name",lable:"City Name",type:"text"},
        {name:"state",placeholder:"State",lable:"State Name",type:"text"},
        {name:"area",placeholder:"area",lable:"aera",type:"text"},
        {name:"pincode",placeholder:"Pincode",lable:"Pincode",type:"number"},
        {name:"url",placeholder:"Hotel Url",lable:"Hotel Url",type:"text"},
    ]
    useEffect(()=>{
        if(preState.success){
            toast.success("hotel added sucessfully")
            if(show) setShow(false);
        }else if(!preState.success && preState.error){
            toast.error(preState.error)
        }
    },[preState])
    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
                const data = e.currentTarget;
                e.preventDefault();
                startTransition(()=>{
                    action(new FormData(data));
                })
        }
  return (<>
    <div className='w-fit z-10 flex justify-center items-center fixed top-[2%] left-[45%] mx-auto overflow-hidden'>
        <div  
            className={`overflow-hidden backdrop-blur-3xl w-full h-full fixed top-0 left-[0%] ${!show && 'hidden'}`} 
            onClick={()=>setShow(e=>!e)}
        />

       {show && <div className={`min-w-96 z-10 p-5 overflow-hidden `}>
            <div>
                <form className="max-w-sm mx-auto" onSubmit={handleSubmit} >
                    {FormFileds.map((e,i)=><div key={i} className="mb-5">
                        <label htmlFor={e.name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            {e.lable}
                        </label>
                        <input type={e.type} name={e.name} id={e.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="test" required />
                    </div>)}
                    <button disabled={isPending} type="submit" className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${isPending && "cursor-not-allowed"}`}>
                        {isPending ? "Submitting..." :"Submit"}
                    </button>
                </form>
            </div>
        </div>}
    </div>
    <button type="button" onClick={()=>setShow(e=>!e)} className="text-white bg-blue-700 hover:bg-blue-800  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Add Hotel
    </button>
</>)
}
