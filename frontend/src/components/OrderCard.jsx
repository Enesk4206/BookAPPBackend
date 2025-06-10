import React from 'react';

const OrderCard = () => {
  return (
    <section className="w-full h-[320px] bg-gray-50 shadow-md my-12">
      <div className="max-w-7xl mx-auto h-full flex rounded-xl overflow-hidden">
        {/* Sol taraf - Görsel */}
        <div className="w-1/2 h-full">
          <img
            src="/images/box1.jpg"
            alt="Kitap Siparişi"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Sağ taraf - Metin ve Buton */}
        <div className="w-1/2 bg-white flex flex-col justify-center px-10 py-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-3">
            Kitap Siparişi Artık Çok Kolay
          </h2>
          <p className="text-gray-600 mb-6 text-base leading-relaxed">
            En sevdiğiniz kitaplara birkaç tıklamayla ulaşın. Geniş koleksiyonumuzla
            her zevke uygun kitap sizi bekliyor. Hemen göz atın!
          </p>
          <a
            href="/all-books"
            className="inline-block bg-indigo-600 text-white px-6 py-2.5 rounded-md hover:bg-indigo-700 transition duration-300 text-sm font-medium"
          >
            Kitaplara Göz At
          </a>
        </div>
      </div>
    </section>
  );
};

export default OrderCard;
