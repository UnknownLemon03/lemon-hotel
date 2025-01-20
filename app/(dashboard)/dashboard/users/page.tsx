import React from 'react'
import { redirect } from 'next/navigation';
import { GetJWTSession } from '@/backend/Auth';
import Table from './Table';
import EditNewBooking from '@/components/EditNewBooking';
import { getBookingById } from '@/backend/database';
import { parse } from 'path';
import { BookingsTypeDB } from '@/backend/Types';

export default async function page({ searchParams }:{ searchParams:{hotelID:string} }) {
        const token = await GetJWTSession();
        if(!token) return redirect("/auth");
        
    return (
    <>
      <h3 className="text-3xl font-bold dark:text-white mb-5">Users</h3>
        <Table/>
    </>
  )
}
