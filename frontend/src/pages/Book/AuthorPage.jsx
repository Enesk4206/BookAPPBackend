import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AuthorPage = () => {
  const [search, setSearch] = useState('');
  const [nationality, setNationality] = useState('');

  const authors = [
    { id: 1, name: 'Victor Hugo', nationality: 'Fransız', birthYear: 1802 },
    { id: 2, name: 'J.K. Rowling', nationality: 'İngiliz', birthYear: 1965 },
    { id: 3, name: 'George Orwell', nationality: 'İngiliz', birthYear: 1903 },
    { id: 4, name: 'Fyodor Dostoyevski', nationality: 'Rus', birthYear: 1821 },
    { id: 5, name: 'J.R.R. Tolkien', nationality: 'İngiliz', birthYear: 1892 },
  ];

  const filteredAuthors = authors.filter(author =>
    author.name.toLowerCase().includes(search.toLowerCase()) &&
    (nationality ? author.nationality === nationality : true)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Başlık ve Filtre Alanı */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Yazarları Keşfedin</h1>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <input
            type="text"
            placeholder="Yazar adı ara..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-1/3"
          />
          <select
            value={nationality}
            onChange={e => setNationality(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-1/4"
          >
            <option value="">Milliyet Seç</option>
            <option value="Fransız">Fransız</option>
            <option value="İngiliz">İngiliz</option>
            <option value="Rus">Rus</option>
          </select>
        </div>
      </div>

      {/* Yazar Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAuthors.map(author => (
          <div
            key={author.id}
            className="flex bg-white shadow-md rounded-lg overflow-hidden"
          >
            {/* Sol: Bilgi */}
            <div className="w-2/3 p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{author.name}</h2>
                <p className="text-gray-500 mb-1">{author.nationality} • {author.birthYear}</p>
              </div>
              <div className="mt-4">
                <Link to={`/author-details/${author.id}`}>
                  <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">
                    İncele
                  </button>
                </Link>
              </div>
            </div>

            {/* Sağ: Resim */}
            <div className="w-1/3">
              <img
                src={`/images/hero1.jpg`} // public/images/ içinde author1.jpg vs.
                alt={author.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}

        {filteredAuthors.length === 0 && (
          <p className="text-gray-500 col-span-2">Sonuç bulunamadı.</p>
        )}
      </div>
    </div>
  );
};

export default AuthorPage;
