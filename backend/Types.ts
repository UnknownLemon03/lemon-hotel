import { z } from 'zod';

export const UserTypeDB = z.object({
  id: z.number(),
  email: z.string(),
  password: z.string(),
  admin: z.boolean(),
});


export const HotelTypeDB = z.object({
    id: z.number(),
    name: z.string(),
    city: z.string(),
    state: z.string(),
    area: z.string(),
    pincode: z.number(),
    url: z.string(),
    images:z.array(z.string()),
});

export const HotelType = z.object({
    name: z.string(),
    city: z.string(),
    state: z.string(),
    area: z.string(),
    pincode: z.number(),
    url: z.string(),
    images:z.array(z.string())
});

export const ImagesTypeDB = z.object({
    id: z.number(),
    url: z.string(),
    hotelid: z.number(),
});


export const BookingsTypeDB = z.object({
    id: z.number(),
    userid: z.number(),
    name: z.string(),
    email: z.string(),
    id_number: z.string(),
    number: z.string(),
    address: z.string(),
    purpose: z.string(),
    start: z.date(),
    end: z.date(),
    hotel_id: z.number(),
    hotel_name: z.string(),
    hotel_address: z.string(),
});
export const BookingsType = z.object({
    userid: z.number(),
    name: z.string(),
    email: z.string(),
    id_number: z.string(),
    number: z.string(),
    address: z.string(),
    purpose: z.string(),
    start: z.date(),
    end: z.date(),
    hotel_id: z.number(),
    hotel_name: z.string(),
    hotel_address: z.string(),
});



export type BookingsTypeDB = z.infer<typeof BookingsTypeDB>;
export type BookingsType = z.infer<typeof BookingsType>;
export type ImagesTypeDB = z.infer<typeof ImagesTypeDB>;
export type HotelTypeDB = z.infer<typeof HotelTypeDB>;
export type HotelType = z.infer<typeof HotelType>;
export type UserTypeDB = z.infer<typeof UserTypeDB>;