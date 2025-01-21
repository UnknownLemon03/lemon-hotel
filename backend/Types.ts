import { z } from 'zod';

export const UserTypeDB = z.object({
  id: z.number(),
  email: z.string(),
  password: z.string(),
  admin: z.boolean(),
});
export const UserType = z.object({
    email: z.string().email('Invalid email format').min(1, 'Email is required'), 
    password:z.string().min(7, 'Password must be at least 7 characters long')
  .regex(/[A-Za-z]/, 'Password must contain at least one letter')
  .regex(/\d/, 'Password must contain at least one number'),
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
    name: z.string().min(1, 'Name is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    area: z.string().min(1, 'Area is required'),
    pincode: z.number().int().min(100000, 'Pincode must be 6 digits').max(999999, 'Pincode must be 6 digits'),
    url: z.string().min(1, 'URL is required'),
    images:z.array(z.string()).min(1, 'Image is required')
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
    name: z.string().min(1, 'Name is required'), 
    email: z.string().email('Invalid email format').min(1, 'Email is required'), 
    id_number: z.string().min(1, 'ID number is required'), 
    number: z.string().min(1, 'Number is required'), 
    address: z.string().min(1, 'Address is required'), 
    purpose: z.string().min(1, 'Purpose is required'),
    start: z.date(),
    end: z.date(),
    hotel_id: z.number(),
    hotel_name: z.string().min(1, 'Hotel name is required'), 
    hotel_address: z.string().min(1, 'Hotel address is required') 
});




export type BookingsTypeDB = z.infer<typeof BookingsTypeDB>;
export type BookingsType = z.infer<typeof BookingsType>;
export type ImagesTypeDB = z.infer<typeof ImagesTypeDB>;
export type HotelTypeDB = z.infer<typeof HotelTypeDB>;
export type HotelType = z.infer<typeof HotelType>;
export type UserTypeDB = z.infer<typeof UserTypeDB>;