import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { getAllBooks, deleteBook } from '../api/bookService';
import { useNavigate } from 'react-router-dom';

const AdminBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const data = await getAllBooks();
      setBooks(data);
    } catch (error) {
      alert('Kitaplar alınırken hata oluştu.');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bu kitabı silmek istediğinize emin misiniz?')) return;
    try {
      await deleteBook(id);
      setBooks(prev => prev.filter(book => book.id !== id));
    } catch (error) {
      alert('Kitap silinirken hata oluştu.');
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">📚 Kitap Yönetimi</h1>

        {loading ? (
          <div className="text-center text-gray-600">Yükleniyor...</div>
        ) : (
          <div className="overflow-x-auto rounded shadow">
            <table className="min-w-full bg-white border border-gray-200 text-sm">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-3 text-left">ID</th>
                  <th className="px-6 py-3 text-left">İsim</th>
                  <th className="px-6 py-3 text-left">Yıl</th>
                  <th className="px-6 py-3 text-left">Fiyat</th>
                  <th className="px-6 py-3 text-left">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {books.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-800">{book.id}</td>
                    <td className="px-6 py-4">{book.name}</td>
                    <td className="px-6 py-4">{book.year}</td>
                    <td className="px-6 py-4">{book.price} ₺</td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => navigate(`/admin/book/details/${book.id}`)}
                        className="inline-block px-3 py-1 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        Detay
                      </button>
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="inline-block px-3 py-1 text-sm font-medium bg-red-600 text-white rounded hover:bg-red-700 transition"
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminBooksPage;
