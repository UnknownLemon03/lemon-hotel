import React from 'react'
import { redirect } from 'next/navigation';
import { GetJWTSession } from '@/backend/Auth';
import Table from './Table';
import EditNewBooking from '@/components/EditNewBooking';
import { getBookingById } from '@/backend/database';
import { BookingsTypeDB } from '@/backend/Types';

interface PageProps {
    searchParams: { hotelID: string };
}

export default async function Page({ searchParams }: PageProps) {
    const token = await GetJWTSession();
    if (!token) return redirect("/auth");

    const { hotelID } = await searchParams;
    let hotelData: BookingsTypeDB | null = null;

    if (!isNaN(parseInt(hotelID))) {
        const { data } = await getBookingById(parseInt(hotelID));
        hotelData = data;
    }

    return (
        <>
            {hotelData && <EditNewBooking data={hotelData} hotelid={parseInt(hotelID)} />}
            <h3 className="text-3xl font-bold dark:text-white mb-5">Bookings</h3>
            <Table />
        </>
    );
}
