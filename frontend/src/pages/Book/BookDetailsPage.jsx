import React from 'react';
import { useParams, Link } from 'react-router-dom';

const BookDetailsPage = () => {
  const { id } = useParams();

  const books = [
    {
      id: 1,
      title: 'Sefiller',
      author: 'Victor Hugo',
      publisher: 'Penguin Classics',
      pages: 1463,
      category: 'Klasik',
      price: 100,
      year: 1862,
      description: "Victor Hugo'nun başyapıtı. Fransız toplumunun geniş bir panorama ile eleştirisi.",
      image: '/images/box1.jpg',
    },
    {
      id: 2,
      title: 'Harry Potter',
      author: 'J.K. Rowling',
      publisher: 'Bloomsbury',
      pages: 223,
      category: 'Fantastik',
      price: 200,
      year: 1997,
      description: 'Büyücülük dünyasına yolculuk, genç bir büyücünün maceraları.',
      image: '/images/box1.jpg',
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      publisher: 'Secker & Warburg',
      pages: 328,
      category: 'Bilim Kurgu',
      price: 150,
      year: 1949,
      description: 'George Orwell\'den distopik bir roman, totaliter rejim eleştirisi.',
      image: '/images/box1.jpg',
    },
    {
      id: 4,
      title: 'Suç ve Ceza',
      author: 'Fyodor Dostoyevski',
      publisher: 'The Russian Messenger',
      pages: 671,
      category: 'Klasik',
      price: 120,
      year: 1866,
      description: 'Dostoyevski\'den psikolojik çözümleme, suç ve vicdan teması.',
      image: '/images/box1.jpg',
    },
    {
      id: 5,
      title: 'Yüzüklerin Efendisi',
      author: 'J.R.R. Tolkien',
      publisher: 'Allen & Unwin',
      pages: 1178,
      category: 'Fantastik',
      price: 250,
      year: 1954,
      description: 'Tolkien\'den epik bir hikaye, Orta Dünya\'da destansı macera.',
      image: '/images/box1.jpg',
    },
  ];

  const book = books.find(b => b.id === parseInt(id));

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold">Kitap bulunamadı.</h2>
        <Link to="/" className="text-blue-600 underline mt-4 inline-block">Anasayfaya Dön</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    alert(`${book.title} sepete eklendi!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-lg overflow-hidden relative">
        {/* Kitap Görseli */}
        <div className="md:w-1/3 flex items-center justify-center bg-gray-100 p-4">
          <img
            src={book.image}
            alt={book.title}
            className="max-h-96 object-contain rounded"
          />
        </div>

        {/* Kitap Bilgisi */}
        <div className="md:w-2/3 p-8 relative">
          {/* Sağ üst köşede Sepete Ekle butonu */}
          <button
            onClick={handleAddToCart}
            className="absolute top-4 right-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold shadow-md transition duration-300"
          >
            Sepete Ekle
          </button>

          <h1 className="text-4xl font-extrabold mb-4 text-gray-900">{book.title}</h1>
          <p className="text-lg text-gray-600 italic mb-2">Yazar: <span className="font-semibold text-gray-800">{book.author}</span></p>
          <p className="text-lg text-gray-600 mb-1">Yayıncı: <span className="font-semibold text-gray-800">{book.publisher}</span></p>
          <p className="text-lg text-gray-600 mb-1">Sayfa Sayısı: <span className="font-semibold text-gray-800">{book.pages}</span></p>
          <p className="text-lg text-gray-600 mb-4">Kategori: <span className="font-semibold text-gray-800">{book.category}</span> • {book.year}</p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">{book.description}</p>

          <Link
            to="/"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-semibold shadow-md transition duration-300 inline-block"
          >
            Geri Dön
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
