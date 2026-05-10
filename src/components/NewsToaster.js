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
        console.error('Error fetching news:', err);
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    if (news.length === 0) return;
    const interval = setInterval(() => {
      const item = news[Math.floor(Math.random() * news.length)];
      toast(item.title, {
        duration: 4000,
        style: {
          borderRadius: '6px',
          background: '#17212b',
          color: '#eceeea',
          fontSize: '14px',
          padding: '12px 16px',
          borderLeft: '4px solid #f2c230',
        },
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [news]);

  return null;
}
