import React from 'react';
import { ShieldCheck, Undo2, Headset } from 'lucide-react';

const features = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-green-600 mb-4" />,
    title: 'Güvenilirlik',
    description:
      'En güncel güvenlik protokollerini kullanıyoruz. Tüm işlemleriniz güvenli şekilde saklanır ve kontrol edilir. Sisteme olan güveniniz bizim için her şeyden önemlidir.',
  },
  {
    icon: <Undo2 className="w-10 h-10 text-green-600 mb-4" />,
    title: 'Geri Ödeme Garantisi',
    description:
      '14 gün içinde koşulsuz para iadesi. Hizmetimizden memnun kalmazsanız, paranız anında size geri ödenir. Müşteri memnuniyeti garantimizdir.',
  },
  {
    icon: <Headset className="w-10 h-10 text-green-600 mb-4" />,
    title: '7/24 Destek',
    description:
      'Haftanın her günü, günün her saati ulaşabileceğiniz destek hattımızla her zaman yanınızdayız. Size sadece bir mesaj kadar yakınız.',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-gradient-to-b from-green-50 to-white py-16">
      <div className="container mx-auto px-4 text-center mb-12">
        {/* Logo ve Başlık */}
        <div className="inline-flex items-center justify-center gap-3 mb-6">
          <img
            src="/images/box1.jpg"
            alt="logo"
            className="w-12 h-12 rounded-full shadow-md"
          />
          <h2 className="text-3xl font-bold text-gray-800">
            Neden <span className="text-green-600">Bizi</span> Seçmelisiniz?
          </h2>
        </div>
        <p className="text-gray-500 max-w-xl mx-auto">
          Müşteri odaklı yaklaşımımız, iade garantimiz ve destek kalitemizle fark yaratıyoruz. Bizimle çalışmanın ayrıcalıklarını keşfedin.
        </p>
      </div>

      {/* Özellik Kartları */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300 text-left"
          >
            {feature.icon}
            <h3 className="text-xl font-semibold text-green-700 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
