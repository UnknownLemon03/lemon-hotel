'use client' 
import { AddBookingServerAction } from '@/backend/serverAction';
import React, { startTransition, useActionState, useEffect, useState } from 'react'
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';
import DatePicker from 'tailwind-datepicker-react';
import Datepicker from "tailwind-datepicker-react"

export default function AddNewBooking({hotelid,close}:{hotelid:number,close:(x:boolean)=>void}) {
    const [date1,setDate1] = useState(false);
    const [date2,setDate2] = useState(false);
    const [start,setStart] = useState<Date>(new Date());
    const [end,setEnd] = useState<Date>(new Date());
    const [element,setElement] = useState<null|Element>(null)
    const [preState,action,isPending] = useActionState(AddBookingServerAction,{error:"",success:false})
    const [thank,setThank] = useState(false);
    const FormFileds = [
        { name: "name", placeholder: "Full Name", label: "Full Name", type: "text" },
        { name: "email", placeholder: "Email Address", label: "Email Address", type: "email" },
        { name: "id_number", placeholder: "ID Proof Number", label: "ID Proof Number", type: "text" },
        { name: "number", placeholder: "Contact Number", label: "Contact Number", type: "number" },
        { name: "address", placeholder: "Address", label: "Address", type: "text" },
        { name: "purpose", placeholder: "Purpose of Booking", label: "Purpose of Booking", type: "text" },
    ];
    let id: NodeJS.Timeout;
    function closeCard(){
        setThank(e=>!e);
        id = setTimeout(()=>close(false),2000)
    }
    useEffect(()=>{
        if(preState.success){
            toast.success("Hotel booking made sucessfully")
            closeCard()
        }else if(!preState.success && preState.error){
            closeCard()
            toast.error(preState.error)
        }
        ()=>{
            clearTimeout(id);
        }
    },[preState])
    useEffect(()=>{
        setElement(document.querySelector("#portal"))
    },[])
    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        const data = e.currentTarget;
        e.preventDefault();
        if(start > end) return toast.error("not valid date")
        startTransition(()=>{
            const formDate = new FormData(data);
            formDate.set("start",`${start}`);
            formDate.set("end",`${end}`);
            formDate.set("hostel_id",`${hotelid}`);
            action(formDate);
        })
    }
    if(!element) return null;
  return createPortal(<>

    {!thank && <div className={`fixed top-[5%] left-0 max-h-screen w-full z-10 p-5 overflow-scroll`}>
        <div  
            onClick={()=>close(false)}
            className={`overflow-clip backdrop-blur-3xl w-full h-full fixed top-0 left-[0%]`} 
        />
        <div className='flex justify-center items-center'>
            <form className="z-10 mx-auto" onSubmit={handleSubmit} >
                {FormFileds.map((e,i)=><div key={i} className="relative z-0 w-full mb-5 group">
                    <input type={e.type} name={e.name} id={e.name} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-900 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor={e.name} className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        {e.label}
                    </label>
                </div>)}
                <div className='mb-5'>
                    <div className="flex flex-wrap  items-center">
                        <Datepicker options={{minDate:start}} show={date1} setShow={setDate1} selectedDateState={[start,setStart]}/>
                        <span className="mx-4 text-gray-500">to</span>
                        <Datepicker options={{minDate:start}} show={date2} setShow={setDate2} selectedDateState={[end,setEnd]} />
                    </div>
                </div>
                <button disabled={isPending} type="submit" className={`text-white z-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${isPending && "cursor-not-allowed"}`}>
                    {isPending ? "Submitting..." :"Submit"}
                </button>
            </form>
        </div>
    </div>}

    {thank &&<>
    <div  
        onClick={()=>close(false)}
        className={`overflow-clip z-10 backdrop-blur-3xl w-full h-full fixed top-0 left-[0%]`} 
    />
    
    <div className="z-10 fixed top-[25%]  left-0 mx-auto w-full p-2 flex items-center justify-center max-h-screen">
        <div className="p-4 bg-white rounded shadow-lg ring ring-indigo-600/50">
            <div className="flex flex-col items-center space-y-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 w-28 h-28" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth="1">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h1 className="text-4xl font-bold">Thank You !</h1>
                <p>Thank you for your interest! Hotel Booking has been made.</p>
            
            </div>
        </div>
    </div></>}
    </>,element)
}