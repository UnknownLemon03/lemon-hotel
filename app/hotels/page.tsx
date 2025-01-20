'use client'
import { getAllHotels, getAllHotelsByName } from "@/backend/database";
import { HotelTypeDB } from "@/backend/Types";
import Card from "@/components/Card";
import Search from "@/components/Search";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [hotels,setHotels] = useState<HotelTypeDB[]>([])
  const [search,setSearch] = useState<string>("")
  useEffect(()=>{
    if(search.length != 0) return;
    getAllHotels().then(e=>{
      if(e.success){
        setHotels(e.data);
      }else 
        toast.error(e.error)
    })

  },[search])
  useEffect(()=>{
    if(search == "") return;
    getAllHotelsByName(search).then(e=>{
      if(e.success){
        setHotels(e.data)
      }
    })
  },[search])
  return (
  <>
      <div className="px-[10%]">
        <div className="w-full flex justify-center">
          <Search setSearch={setSearch}/>
        </div>
        <div className="flex flex-wrap gap-5 justify-center scrollbar-hide">
        {hotels.map((e,i)=><div key={i} className="flex justify-center">
            <Card data={e}/>
          </div>)}
      
        </div>
      </div>
  </>
  );
}
