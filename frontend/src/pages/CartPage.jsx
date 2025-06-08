import React, { useState } from 'react';

const CartPage = () => {
  // Örnek sepete eklenen kitaplar (gerçek projede global veya backend'den gelir)
  const [cartItems, setCartItems] = useState([
    { id: 1, title: 'Sefiller', price: 100, quantity: 1 },
    { id: 2, title: 'Harry Potter', price: 200, quantity: 2 },
    { id: 5, title: 'Yüzüklerin Efendisi', price: 250, quantity: 1 },
  ]);

  // Toplam fiyat hesaplama
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Miktar artırma / azaltma fonksiyonları
  const increaseQuantity = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Sepetten ürün çıkarma
  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="max-w-5xl w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          Sepetim
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Sepetiniz boş.</p>
        ) : (
          <>
            <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-blue-50">
                  <th className="py-4 px-6 text-left text-gray-600 font-semibold">Kitap</th>
                  <th className="py-4 px-6 text-left text-gray-600 font-semibold">Fiyat</th>
                  <th className="py-4 px-6 text-left text-gray-600 font-semibold">Adet</th>
                  <th className="py-4 px-6 text-left text-gray-600 font-semibold">Ara Toplam</th>
                  <th className="py-4 px-6 text-left text-gray-600 font-semibold">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(({ id, title, price, quantity }) => (
                  <tr
                    key={id}
                    className="border-b border-gray-200 hover:bg-blue-50 transition"
                  >
                    <td className="py-4 px-6 font-medium text-gray-800">{title}</td>
                    <td className="py-4 px-6 text-gray-700">{price}₺</td>
                    <td className="py-4 px-6 flex items-center space-x-3">
                      <button
                        onClick={() => decreaseQuantity(id)}
                        className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition text-gray-700 font-semibold"
                        aria-label="Azalt"
                      >
                        -
                      </button>
                      <span className="font-semibold text-gray-900">{quantity}</span>
                      <button
                        onClick={() => increaseQuantity(id)}
                        className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition text-gray-700 font-semibold"
                        aria-label="Arttır"
                      >
                        +
                      </button>
                    </td>
                    <td className="py-4 px-6 font-semibold text-gray-900">{price * quantity}₺</td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => removeItem(id)}
                        className="text-red-500 hover:text-red-700 transition text-xl font-bold"
                        aria-label="Sil"
                        title="Ürünü kaldır"
                      >
                        &times;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Toplam ve ödeme işlemleri */}
            <div className="mt-8 flex flex-col items-end border-t border-gray-300 pt-6 space-y-3">
              <div className="flex items-center space-x-4">
                <span className="text-xl font-bold text-gray-900">Toplam:</span>
                <span className="text-3xl font-extrabold text-blue-600">{totalPrice}₺</span>
              </div>

              <div className="text-blue-700 font-semibold cursor-pointer hover:underline select-none text-lg">
                Ödeme İşlemleri
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
