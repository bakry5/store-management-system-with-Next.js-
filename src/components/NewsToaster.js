import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function NewsToaster() {
  const [news, setNews] = useState([]);

  
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get('/api/news');
        setNews(res.data);
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    };
    fetchNews();
  }, []);

  
  useEffect(() => {
    if (news.length === 0) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * news.length);
      const randomNews = news[randomIndex];

      toast(randomNews.title, {
        icon: '📢',
        duration: 4000,
        style: {
          borderRadius: '16px',
          background: '#0f172a',
          color: '#f8fafc',
          fontSize: '13px',
          fontWeight: '600',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '12px 20px',
        },
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [news]);

  return null; 
}