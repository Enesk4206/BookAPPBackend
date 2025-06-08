import React from 'react';

const OrderCard = () => {
  return (
    <section className="h-[450px] bg-gray-50 flex shadow-lg rounded-lg overflow-hidden max-w-5xl mx-auto my-8">
      {/* Sol taraf - Resim (tam kapsasın) */}
      <div className="w-1/2">
        <img
          src="/images/box1.jpg"
          alt="Sipariş Kitap"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Sağ taraf - Yazı ve buton */}
      <div className="w-1/2 bg-white flex flex-col justify-center p-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Kitap Siparişini Kolaylaştırıyoruz
        </h2>
        <p className="text-gray-600 mb-8 max-w-lg">
          Sevdiğiniz kitapları hızlı ve kolay bir şekilde sipariş edin. 
          Kütüphanemizde binlerce kitap sizi bekliyor. Hemen keşfedin!
        </p>
        <a
          href="/all-books"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition duration-300 self-start"
        >
          Kitaplara Göz At
        </a>
      </div>
    </section>
  );
};

export default OrderCard;
