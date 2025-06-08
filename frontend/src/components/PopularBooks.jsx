import React from 'react';

const popularBooks = [
  { id: 1, title: 'Book 1', cover: '/images/book1.jpg' },
  { id: 2, title: 'Book 2', cover: '/images/book2.jpg' },
  { id: 3, title: 'Book 3', cover: '/images/book3.jpg' },
  { id: 4, title: 'Book 4', cover: '/images/book4.jpg' },
  // istediğin kadar kitap ekle
];

const PopularBooks = () => {
  return (
    <section className="overflow-hidden py-8">
      <h2 className="text-3xl font-bold mb-6">Most Popular Books</h2>
      <div className="relative">
        <div className="flex animate-scroll whitespace-nowrap space-x-6">
          {/* Kitapları iki kez tekrar ediyoruz sonsuz döngü için */}
          {[...popularBooks, ...popularBooks].map(book => (
            <div key={book.id} className="inline-block w-48 flex-shrink-0">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <h3 className="mt-2 text-center font-semibold">{book.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularBooks;
