import connectDB from "@/lib/mongodb";
import Product from "../../../../models/Product";

export default async function handler(req, res) {
  const { id } = req.query;
  await connectDB();

  switch (req.method) {
    case "GET":
      try {
        const product = await Product.findById(id);
        if (!product)
          return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
      } catch (error) {
        res.status(400).json({ error: "Invalid ID format" });
      }
      break;

    case "PUT":
      try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!updatedProduct)
          return res.status(404).json({ message: "Product not found" });
        res.status(200).json(updatedProduct);
      } catch (error) {
        res.status(400).json({ error: "Update failed" });
      }
      break;

    case "DELETE":
      try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct)
          return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ message: "Product deleted successfully" });
      } catch (error) {
        res.status(400).json({ error: "Delete failed" });
      }
      break;

    default:
      res.status(405).json(`Method ${req.method} Not Allowed`);
  }
}
