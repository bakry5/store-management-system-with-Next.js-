import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = ({ 
  data, 
  onFilter, 
  placeholder = "Search...", 
  searchKeys = ['title', 'description', 'category'],
  className = "" 
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim() === '') {
        onFilter(data);
      } else {
        const filtered = data.filter(item =>
          searchKeys.some(key =>
            item[key]?.toString().toLowerCase().includes(query.toLowerCase())
          )
        );
        onFilter(filtered);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, data, onFilter, searchKeys]);

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
          >
            <FiX size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
