'use server'
import { GetJWTSession } from '@/backend/Auth'
import { redirect } from 'next/navigation';
import React from 'react'

export default async function page() {
  const token = await GetJWTSession();
  if(!token) return redirect("/auth");
  return (
    <div>page</div>
  )
}
