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
        <Table/>
    </>
  )
}
