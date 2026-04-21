import connectDB from "@/lib/mongodb";
import News from '@/models/News';

export default async function handler(req, res) {
  const { method } = req;
   
           await connectDB()

  switch (method) {
    case 'GET':
      try {
       
        const allNews = await News.find({}).sort({ createdAt: -1 });
        res.status(200).json(allNews);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'POST':
      try {
     
        const news = await News.create(req.body);
        res.status(201).json({ success: true, data: news });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}