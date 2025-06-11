import React, { useState, useRef, useEffect } from 'react';

const MultiSelectGenres = ({ genres, selectedGenres, setSelectedGenres }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = genres.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleGenre = (id) => {
    if (selectedGenres.includes(id)) {
      setSelectedGenres(selectedGenres.filter((i) => i !== id));
    } else {
      setSelectedGenres([...selectedGenres, id]);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <label className="block mb-2 font-medium text-gray-700">Türler</label>
      <div
        onClick={() => setOpen(!open)}
        className="min-h-[40px] cursor-pointer border border-gray-300 rounded px-3 py-1 flex flex-wrap gap-1 items-center"
      >
        {selectedGenres.length === 0 && (
          <span className="text-gray-400 select-none">Tür seçin...</span>
        )}
        {selectedGenres.map((id) => {
          const genre = genres.find((g) => g.id === id);
          return (
            <span
              key={id}
              className="bg-blue-600 text-white rounded-full px-2 py-0.5 text-sm flex items-center gap-1"
            >
              {genre?.name}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleGenre(id);
                }}
                className="ml-1 focus:outline-none"
              >
                ×
              </button>
            </span>
          );
        })}
      </div>
      {open && (
        <div className="absolute z-20 w-full mt-1 max-h-48 overflow-auto rounded border border-gray-300 bg-white shadow-lg">
          <input
            type="text"
            placeholder="Ara..."
            className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          <ul>
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-gray-500 select-none">Bulunamadı</li>
            )}
            {filtered.map((genre) => (
              <li
                key={genre.id}
                onClick={() => toggleGenre(genre.id)}
                className={`cursor-pointer px-3 py-2 hover:bg-blue-600 hover:text-white ${
                  selectedGenres.includes(genre.id) ? 'bg-blue-100 text-blue-800' : ''
                }`}
              >
                {genre.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelectGenres;
