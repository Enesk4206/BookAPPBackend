import React from 'react';

const authors = [
  { id: 1, name: "Orhan Pamuk", img: "/images/authors/orhanpamuk.jpg" },
  { id: 2, name: "Elif Şafak", img: "/images/authors/elifshafak.jpg" },
  { id: 3, name: "Yaşar Kemal", img: "/images/authors/yasarkemal.jpg" },
  { id: 4, name: "Ahmet Ümit", img: "/images/authors/ahmetumit.jpg" },
  { id: 5, name: "İhsan Oktay Anar", img: "/images/authors/ihsanoktayanar.jpg" },
  // istediğin kadar ekle
];

const HomeAuthors = () => {
  return (
    <section className="overflow-hidden relative py-6">
      <h2 className="text-2xl font-semibold mb-4 px-4">En Popüler Yazarlar</h2>

      <div className="slider whitespace-nowrap animate-scrollSlow">
        {authors.concat(authors).map((author, index) => (
          <div
            key={index}
            className="inline-block px-4"
            style={{ width: "160px" }}
          >
            <img
              src={author.img}
              alt={author.name}
              className="w-full h-40 object-cover rounded-lg shadow-md"
            />
            <p className="text-center mt-2 font-medium">{author.name}</p>
          </div>
        ))}
      </div>

      {/* Tailwind eklemesi olmayan animasyon için style etiketi */}
      <style>{`
        @keyframes scrollSlow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scrollSlow {
          animation: scrollSlow 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default HomeAuthors;
