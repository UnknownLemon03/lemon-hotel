'use server'
import React from 'react'
import Loading from '../loading'
import QR from '@/components/QR'
import AddNewBooking from '@/components/AddNewBooking'
import Recipte from '@/components/Recipte'
import { AddHotel } from '@/backend/database'

export default async function page() {
  // hotels.forEach(async e=>{await AddHotel({...e,images:[]})})
  return (
    <>
        {/* <Recipte/> */}
    </>
  )
}
const hotels = [
  { name: "Sunny Stay", city: "Miami", state: "Florida", area: "South Beach", pincode: 33139, url: "http://sunnystay.com" },
  { name: "Mountain Bliss", city: "Denver", state: "Colorado", area: "Cherry Creek", pincode: 80206, url: "http://mountainbliss.com" },
  { name: "Ocean Pearl", city: "Malibu", state: "California", area: "Zuma Beach", pincode: 90265, url: "http://oceanpearl.com" },
  { name: "Urban Haven", city: "Seattle", state: "Washington", area: "Downtown", pincode: 98101, url: "http://urbanhaven.com" },
  { name: "Desert Mirage", city: "Phoenix", state: "Arizona", area: "Camelback", pincode: 85018, url: "http://desertmirage.com" },
  { name: "Royal Retreat", city: "Austin", state: "Texas", area: "Barton Creek", pincode: 78746, url: "http://royalretreat.com" },
  { name: "Lakeside Resort", city: "Orlando", state: "Florida", area: "Lake Buena Vista", pincode: 32830, url: "http://lakesideresort.com" },
  { name: "Golden Gate Lodge", city: "San Francisco", state: "California", area: "Fisherman's Wharf", pincode: 94133, url: "http://goldengatelodge.com" },
  { name: "Autumn Inn", city: "Portland", state: "Oregon", area: "Pearl District", pincode: 97209, url: "http://autumninn.com" },
  { name: "Maplewood Hotel", city: "Chicago", state: "Illinois", area: "Magnificent Mile", pincode: 60611, url: "http://maplewoodhotel.com" },
  { name: "Seaside Escape", city: "Santa Monica", state: "California", area: "Ocean Avenue", pincode: 90401, url: "http://seasideescape.com" },
  { name: "Blue Lagoon", city: "Key West", state: "Florida", area: "Old Town", pincode: 33040, url: "http://bluelagoon.com" },
  { name: "Pine Grove Inn", city: "Boise", state: "Idaho", area: "Downtown", pincode: 83702, url: "http://pinegroveinn.com" },
  { name: "Aurora Stay", city: "Anchorage", state: "Alaska", area: "Midtown", pincode: 99503, url: "http://aurorastay.com" },
  { name: "Cascade Lodge", city: "Boulder", state: "Colorado", area: "University Hill", pincode: 80302, url: "http://cascadelodge.com" },
  { name: "Serenity Inn", city: "Charleston", state: "South Carolina", area: "Historic District", pincode: 29401, url: "http://serenityinn.com" },
  { name: "Harbor View", city: "San Diego", state: "California", area: "Gaslamp Quarter", pincode: 92101, url: "http://harborview.com" },
  { name: "Timberline Hotel", city: "Salt Lake City", state: "Utah", area: "Downtown", pincode: 84101, url: "http://timberlinehotel.com" },
  { name: "Emerald Stay", city: "Dallas", state: "Texas", area: "Uptown", pincode: 75204, url: "http://emeraldstay.com" },
  { name: "Willow Creek", city: "Nashville", state: "Tennessee", area: "Music Row", pincode: 37203, url: "http://willowcreek.com" },
  { name: "Snowy Peaks", city: "Jackson", state: "Wyoming", area: "Teton Village", pincode: 83025, url: "http://snowypeaks.com" },
  { name: "Crimson Resort", city: "Sedona", state: "Arizona", area: "Red Rock", pincode: 86336, url: "http://crimsonresort.com" },
  { name: "Golden Horizon", city: "Los Angeles", state: "California", area: "Beverly Hills", pincode: 90210, url: "http://goldenhorizon.com" },
  { name: "The Grand Vista", city: "Las Vegas", state: "Nevada", area: "The Strip", pincode: 89109, url: "http://thegrandvista.com" },
  { name: "Cedar Lodge", city: "Asheville", state: "North Carolina", area: "Biltmore", pincode: 28803, url: "http://cedarlodge.com" },
  { name: "Ivory Sands", city: "Myrtle Beach", state: "South Carolina", area: "Ocean Boulevard", pincode: 29577, url: "http://ivorysands.com" },
  { name: "Vista Verde", city: "Santa Fe", state: "New Mexico", area: "Historic Plaza", pincode: 87501, url: "http://vistaverde.com" },
  { name: "Coastal Bliss", city: "Virginia Beach", state: "Virginia", area: "Oceanfront", pincode: 23451, url: "http://coastalbliss.com" },
  { name: "The Sapphire Inn", city: "Honolulu", state: "Hawaii", area: "Waikiki", pincode: 96815, url: "http://thesapphireinn.com" },
  { name: "Alpine Meadows", city: "Lake Tahoe", state: "California", area: "Northstar", pincode: 96161, url: "http://alpinemeadows.com" }
];
