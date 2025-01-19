'use client' 
import { AddBookingServerAction } from '@/backend/serverAction';
import { BookingsTypeDB, HotelType, HotelTypeDB } from '@/backend/Types';
import { getDate } from '@/backend/util';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom';


export default function Recipte({Booking,close}:{Booking:BookingsTypeDB,close:(x:boolean)=>void}) {
    const [element,setElement] = useState<null|Element>(null)
    useEffect(()=>{
        setElement(document.querySelector("#portal"))
    },[])
      
    if(!element) return null;
    const data:{[key:string]:string|number} = {
        Name:Booking.name,
        Email:Booking.email,
        "Proof ID":Booking.id_number,
        "Phone Number":Booking.number,
        Address:Booking.address,
        purpose:Booking.purpose,
        From:getDate(new Date(Booking.start)),
        To:getDate(new Date(Booking.end)),
    }  
  return createPortal(<>
        
   <div className={`fixed top-[5%] z-10 left-0 max-h-screen w-full p-5 overflow-scroll`}>
    <div  
        onClick={()=>close(false)}
        className={`overflow-clip z-10  bg-opacity-40 w-full h-full fixed top-0 left-[0%]`} 
    />
        <div  
            className={`overflow-clip backdrop-blur-3xl w-full h-full fixed top-0 left-[0%]`} 
        />
        <div className=' flex justify-center items-center'>
        {/* <!-- component --> */}
                <div  id="recipte" className="z-10 w-80 rounded bg-gray-50 px-6 pt-8 shadow-lg">
                <Image className='cursor-pointer' src={"/close.svg"} onClick={()=>close(false)} height={30} width={30} alt='Close'/>
                    {/* <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="chippz" className="mx-auto w-16 py-4" /> */}
                    <div className="flex flex-col justify-center items-center gap-2">
                        <h4 className="font-semibold">{Booking.name}</h4>
                        <p className="text-wrap text-xs">{`${Booking.hotel_address}`}</p>
                    </div>
                    <div className="flex flex-col gap-3 border-b py-6 text-xs">
                    {Object.keys(data).map((key, i) => (
                        <span key={i} className="flex justify-between">
                            <span className="text-gray-400 mr-2">{key}</span>
                            <span className='text-wrap text-end'>{data[key]?.toString()}</span>
                        </span>
                    ))}
                    <Image id="printer" className='cursor-pointer' src={"/print.svg"} onClick={printReceipt} height={30} width={30} alt='Close'/>
                    </div>
                    </div>    
            </div>
        </div>
    </>,element)
}

const printReceipt = () => {
    const receipt = document.getElementById('recipte');
  
    if (receipt) {
      // Get the receipt's width and height
      const width = receipt.offsetWidth;
      const height = receipt.offsetHeight;
  
      // Open a new window with the same width and height as the receipt
      const printWindow = window.open('', '_blank', `width=${width + 20},height=${height + 20}`);
  
      // Remove all <img> tags from the receipt content
      const receiptContent = receipt.innerHTML.replace(/<img[^>]*>/g, ''); // This will remove all <img> tags
  
      // Add the Tailwind CSS CDN to the print window and set specific styles for the page size
      printWindow?.document.write('<html><head><title>Receipt</title>');
      printWindow?.document.write('<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">'); // Tailwind CDN link
  
      // Add custom styles to control the page size and print layout
      printWindow?.document.write(`
        <style>
          body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
          }
          .receipt-container {
            width: ${width}px;
            height: ${height}px;
            padding: 20px;
          }
          @page {
            size: ${width}px ${height}px; /* Set the page size to match the content */
            margin: 0; /* Remove default margins */
          }
          @media print {
            body {
              width: ${width}px;
              height: ${height}px;
              margin: 0;
            }
            .receipt-container {
              width: 100%;
              height: 100%;
              padding: 0;
              margin: 0;
            }
          }
        </style>
      `);
  
      printWindow?.document.write('</head><body>');
      
      // Wrap the content in a container to apply the receipt styles
      printWindow?.document.write(`
        <div class="receipt-container">
          ${receiptContent}  <!-- Using the modified content without <img> tags -->
        </div>
      `);
  
      printWindow?.document.write('</body></html>');
  
      printWindow?.document.close();  // Close the document to trigger rendering
      printWindow?.print();  // Trigger print
    }
  };
  