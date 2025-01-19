import { getAllHotels } from "@/backend/database";
import AddNewBooking from "@/components/AddNewBooking";
import Card from "@/components/Card";
import Search from "@/components/Search";
import Image from "next/image";

export default async function Home() {
  const data = await getAllHotels()
  return (
  <>
     
  </>
  );
}
