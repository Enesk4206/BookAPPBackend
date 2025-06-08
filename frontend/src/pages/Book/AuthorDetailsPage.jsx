import React from 'react';
import { Link, useParams } from 'react-router-dom';

// Örnek yazar ve kitap verisi
const authors = [
  { id: 1, name: 'Victor Hugo' },
  { id: 2, name: 'J.K. Rowling' },
  { id: 3, name: 'George Orwell' },
  { id: 4, name: 'Fyodor Dostoyevski' },
  { id: 5, name: 'J.R.R. Tolkien' },
];

// Kitaplar örnek veri (gerçek projede backend’den gelir)
const books = [
  { id: 101, title: 'Sefiller', authorId: 1 },
  { id: 102, title: 'Notre-Dame de Paris', authorId: 1 },
  { id: 201, title: 'Harry Potter ve Felsefe Taşı', authorId: 2 },
  { id: 202, title: 'Harry Potter ve Sırlar Odası', authorId: 2 },
  { id: 301, title: '1984', authorId: 3 },
  { id: 401, title: 'Suç ve Ceza', authorId: 4 },
  { id: 402, title: 'Karamazov Kardeşler', authorId: 4 },
  { id: 501, title: 'Yüzüklerin Efendisi', authorId: 5 },
  { id: 502, title: 'Hobbit', authorId: 5 },
];

const AuthorDetailsPage = () => {
  const { authorId } = useParams();
  const author = authors.find(a => a.id === parseInt(authorId));

  // Eğer yazar bulunamazsa
  if (!author) {
    return <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Yazar bulunamadı</h2>
      <Link to="/all-authors" className="text-blue-600 hover:underline">Yazarlara geri dön</Link>
    </div>;
  }

  // Yazara ait kitaplar
  const authorBooks = books.filter(book => book.authorId === author.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{author.name} - Kitapları</h1>

      {authorBooks.length === 0 ? (
        <p className="text-gray-600">Bu yazara ait kitap bulunamadı.</p>
      ) : (
        <ul className="space-y-4">
          {authorBooks.map(book => (
            <li key={book.id} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
              <Link
                to={`/book-details/${book.id}`}
                className="text-blue-600 hover:underline text-lg font-semibold"
              >
                {book.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AuthorDetailsPage;
