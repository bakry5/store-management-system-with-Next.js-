import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    thumbnail: { type: String, default: "https://cdn.dummyjson.com/public/qr-code.png"},
    category: String,
  },
  { timestamps: true },
);
let Product= mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);

export default Product