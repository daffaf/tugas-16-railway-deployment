import dotenv from 'dotenv';
dotenv.config()

export const CLOUDINARY_API_KEY: string = process.env.CLOUDINARY_API_KEY || "";
export const CLOUDINARY_API_SECRET: string =
  process.env.CLOUDINARY_API_SECRET || "";
export const CLOUDINARY_CLOUD_NAME: string =
  process.env.CLOUDINARY_CLOUD_NAME || "";
export const DATABASE_URL: string = 
"mongodb+srv://daffafadila00:daffafadila00@belajar-nodejs.1lyu0nb.mongodb.net/?retryWrites=true&w=majority&appName=belajar-nodejs";

// export let SECRET: string = process.env.SECRET || "secret";
export const SECRET: string = process.env.SECRET || "12345678901234567890123456789012";
// SECRET = "12345678901234567890123456789012";