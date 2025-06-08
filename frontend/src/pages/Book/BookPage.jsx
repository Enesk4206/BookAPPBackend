import React, { useState } from 'react';
import {Link} from "react-router-dom";
const BookPage = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [category, setCategory] = useState('');

  const books = [
    { id: 1, title: 'Sefiller', category: 'Klasik', price: 100, year: 1862 },
    { id: 2, title: 'Harry Potter', category: 'Fantastik', price: 200, year: 1997 },
    { id: 3, title: '1984', category: 'Bilim Kurgu', price: 150, year: 1949 },
    { id: 4, title: 'Suç ve Ceza', category: 'Klasik', price: 120, year: 1866 },
    { id: 5, title: 'Yüzüklerin Efendisi', category: 'Fantastik', price: 250, year: 1954 },
  ];

  const filteredBooks = books
    .filter(book =>
      book.title.toLowerCase().includes(search.toLowerCase()) &&
      (category ? book.category === category : true)
    )
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'year-desc') return b.year - a.year;
      if (sort === 'year-asc') return a.year - b.year;
      return 0;
    });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Başlık ve Filtre Alanı */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Kitapları Keşfedin</h1>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <input
            type="text"
            placeholder="Kitap adı ara..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-1/3"
          />
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-1/4"
          >
            <option value="">Sırala</option>
            <option value="price-asc">Fiyat: Artan</option>
            <option value="price-desc">Fiyat: Azalan</option>
            <option value="year-desc">Yıla Göre: En Yeni</option>
            <option value="year-asc">Yıla Göre: En Eski</option>
          </select>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-1/4"
          >
            <option value="">Kategori Seç</option>
            <option value="Klasik">Klasik</option>
            <option value="Fantastik">Fantastik</option>
            <option value="Bilim Kurgu">Bilim Kurgu</option>
          </select>
        </div>
      </div>

      {/* Kitap Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBooks.map(book => (
          <div
            key={book.id}
            className="flex bg-white shadow-md rounded-lg overflow-hidden"
          >
            {/* Sol: Bilgi */}
            <div className="w-2/3 p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{book.title}</h2>
                <p className="text-gray-500 mb-1">{book.category} • {book.year}</p>
                <p className="text-gray-700 text-lg font-bold">{book.price}₺</p>
              </div>
              <div className="mt-4">
                <Link to={`/book-details/${book.id}`}>
                     <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                        İncele
                    </button>
                </Link>
           
              </div>
            </div>

            {/* Sağ: Resim */}
            <div className="w-1/3">
              <img
                src={`/images/box1.jpg`}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}

        {filteredBooks.length === 0 && (
          <p className="text-gray-500 col-span-2">Sonuç bulunamadı.</p>
        )}
      </div>
    </div>
  );
};

export default BookPage;
