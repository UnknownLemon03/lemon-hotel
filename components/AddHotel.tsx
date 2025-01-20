'use client'
import { AddNewHotelServerAction } from '@/backend/serverAction';
import { HotelType } from '@/backend/Types';
import { Hotel } from '@prisma/client';
import React, { Dispatch, SetStateAction, startTransition, useActionState, useEffect, useState } from 'react'
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';

export default function AddHotel() {
    const [show,setShow] = useState(false);
    return (<>
        <button type="button" onClick={()=>setShow(e=>!e)} className="text-white bg-blue-700 hover:bg-blue-800  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Add Hotel
        </button>
        {show && <AddHotelForm setShow={setShow} show={show}/>}
    </>)
}

function AddHotelForm({show,setShow}:{show:boolean,setShow:Dispatch<SetStateAction<boolean>>}) {
     const [element,setElement] = useState<null|Element>(null)
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
    useEffect(()=>{
        setElement(document.querySelector("#portal"))
    },[])
    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        const data = e.currentTarget;
        e.preventDefault();
        startTransition(()=>{
            action(new FormData(data));
        })
    }
    if(!element) return null;
  return createPortal(<>

        <div  
            onClick={()=>setShow(e=>!e)}
            className={`overflow-clip backdrop-blur-3xl w-full h-screen fixed  z-10`} 
        >
        <div className='flex justify-center items-center fixed z-10 mx-auto w-full'>
            <div className={`min-w-96 z-99 p-5 overflow-hidden z-10 flex justify-center items-center`}>
                    <form className="z-10 mx-auto w-full" onSubmit={handleSubmit} >
                        {FormFileds.map((e,i)=><div key={i} className="mb-5 w-full">
                            <label htmlFor={e.name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                {e.lable}
                            </label>
                            <input type={e.type} name={e.name} id={e.name} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="test" required />
                        </div>)}
                        <button disabled={isPending} type="submit" className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${isPending && "cursor-not-allowed"}`}>
                            {isPending ? "Submitting..." :"Submit"}
                        </button>
                    </form>
            </div>
        </div>
        </div>
    
</>,element)
}
