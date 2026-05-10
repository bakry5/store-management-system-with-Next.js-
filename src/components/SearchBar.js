import { useState, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = ({
  data,
  onFilter,
  placeholder = 'Search...',
  searchKeys = ['title', 'description', 'category'],
  className = '',
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim() === '') {
        onFilter(data);
      } else {
        const q = query.toLowerCase();
        onFilter(
          data.filter((item) =>
            searchKeys.some((key) => item[key]?.toString().toLowerCase().includes(q))
          )
        );
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [query, data, onFilter, searchKeys]);

  return (
    <div className={`relative ${className}`}>
      <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft" size={18} />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-label="Search products"
        className="field pl-10 pr-10"
      />
      {query && (
        <button
          onClick={() => setQuery('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-soft hover:text-ink"
        >
          <FiX size={18} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
