import React from 'react';

const ContactPage = () => {
  return (
    <section className="bg-gray-50 pt-28 pb-28">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Başlık */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Bize Ulaşın</h2>
          <p className="text-gray-600 text-lg">
            Her türlü soru, öneri ya da destek talebiniz için bize ulaşmaktan çekinmeyin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* İletişim Formu */}
          <form className="bg-white p-8 shadow-lg rounded-lg space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Ad Soyad</label>
              <input
                type="text"
                placeholder="Adınızı girin"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">E-posta</label>
              <input
                type="email"
                placeholder="ornek@mail.com"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Mesajınız</label>
              <textarea
                rows="5"
                placeholder="Mesajınızı buraya yazabilirsiniz..."
                className="w-full border border-gray-300 px-4 py-2 rounded-md resize-none focus:ring focus:ring-blue-300"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition duration-300"
            >
              Gönder
            </button>
          </form>

          {/* İletişim Bilgileri */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-1">Adres</h4>
              <p className="text-gray-600">İstanbul, Türkiye</p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-1">E-posta</h4>
              <p className="text-gray-600">destek@kitapdunyasi.com</p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-1">Telefon</h4>
              <p className="text-gray-600">+90 212 000 00 00</p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-1">Çalışma Saatleri</h4>
              <p className="text-gray-600">Hafta içi: 09:00 - 18:00</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
