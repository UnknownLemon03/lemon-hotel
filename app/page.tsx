import { getAllHotels } from "@/backend/database";
import AddNewBooking from "@/components/AddNewBooking";
import Card from "@/components/Card";
import Search from "@/components/Search";
import Image from "next/image";

export default async function Home() {
  const data = await getAllHotels()
  return (
  <>
      <div className="px-[10%]">
        <Search/>
        <div className="flex flex-wrap gap-5 justify-center scrollbar-hide">
        {data.data.map((e,i)=><div key={i} className="flex justify-center">
            <Card data={e}/>
          </div>)}
        </div>
      </div>
  </>
  );
}
