import mongoose from "mongoose";

export const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export interface Product extends mongoose.Document {
    _id: string | undefined;
    title: string;
    description: string;
    price: number;
}

export interface ProductDTO {
    title: string;
    description: string;
    price: number;
}
