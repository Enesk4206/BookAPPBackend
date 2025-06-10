import React from 'react';

const AboutPage = () => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-100 py-24">
      <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10 items-center max-w-6xl">
        {/* Görsel Alanı */}
        <div className="w-full h-full">
          <img
            src="/images/contact.jpg"
            alt="About Us"
            className="w-full h-full object-cover rounded-2xl shadow-xl"
          />
        </div>

        {/* Metin Alanı */}
        <div className="flex flex-col justify-center">
          <h2 className="text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
            Hakkımızda
          </h2>
          <p className="text-lg text-gray-600 mb-5 leading-relaxed">
            Biz, <span className="text-indigo-600 font-semibold">bilgiye erişimi kolaylaştırmak</span> ve kitap okuma kültürünü desteklemek amacıyla yola çıktık.
            Teknolojiyi ve tasarımı bir araya getirerek, kullanıcı dostu bir deneyim sunuyoruz.
          </p>
          <p className="text-lg text-gray-600 mb-5 leading-relaxed">
            Kurulduğumuz günden bu yana <span className="font-semibold text-gray-800">şeffaflık</span>, <span className="font-semibold text-gray-800">güven</span> ve <span className="font-semibold text-gray-800">kalite</span> ilkeleriyle hareket ediyoruz.
            Her zaman gelişimi hedefliyor, kullanıcılarımız için en iyisini sunmayı amaçlıyoruz.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            <strong>Misyonumuz:</strong> Erişilebilir, hızlı ve güvenilir bir dijital kitap deneyimi sunmak. <br />
            <strong>Vizyonumuz:</strong> Türkiye'nin en güvenilir kitap platformlarından biri olmak.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
