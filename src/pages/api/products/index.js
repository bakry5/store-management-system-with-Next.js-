import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const products = await Product.find({});
    res.status(200).json(products);
  }

  if (req.method === "POST") {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: "Failed to create product" });
    }
  }
}
