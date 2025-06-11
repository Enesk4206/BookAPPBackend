import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import {
  getAllAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from '../api/authorService';

const initialAuthor = { name: '', nation: '', birthYear: '' };

const AdminAuthorsPage = () => {
  const [authors, setAuthors] = useState([]);
  const [newAuthor, setNewAuthor] = useState(initialAuthor);
  const [editAuthorId, setEditAuthorId] = useState(null);
  const [editAuthor, setEditAuthor] = useState(initialAuthor);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    setLoading(true);
    try {
      const data = await getAllAuthors();
      setAuthors(data);
    } catch (error) {
      console.error(error);
      alert('Yazarlar alınırken hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (setter, field) => (e) =>
    setter((prev) => ({ ...prev, [field]: e.target.value }));

  const isAuthorValid = ({ name, nation, birthYear }) =>
    name.trim() && nation.trim() && !isNaN(parseInt(birthYear, 10));

  const handleCreate = async () => {
    if (!isAuthorValid(newAuthor)) {
      alert('Tüm alanları doğru şekilde doldurmalısınız.');
      return;
    }

    try {
      const created = await createAuthor({
        ...newAuthor,
        birthYear: parseInt(newAuthor.birthYear, 10),
      });
      setAuthors((prev) => [...prev, created]);
      setNewAuthor(initialAuthor);
    } catch (error) {
      console.error(error);
      alert('Yazar eklenirken hata oluştu.');
    }
  };

  const handleEditClick = (author) => {
    setEditAuthorId(author.id);
    setEditAuthor({
      name: author.name,
      nation: author.nation,
      birthYear: author.birthYear,
    });
  };

  const handleUpdate = async (id) => {
    if (!isAuthorValid(editAuthor)) {
      alert('Tüm alanları doğru şekilde doldurmalısınız.');
      return;
    }

    try {
      const updated = await updateAuthor(id, {
        ...editAuthor,
        birthYear: parseInt(editAuthor.birthYear, 10),
      });
      setAuthors((prev) => prev.map((a) => (a.id === id ? updated : a)));
      setEditAuthorId(null);
      setEditAuthor(initialAuthor);
    } catch (error) {
      console.error(error);
      alert('Yazar güncellenirken hata oluştu.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bu yazarı silmek istediğinize emin misiniz?')) return;
    try {
      await deleteAuthor(id);
      setAuthors((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error(error);
      alert('Yazar silinirken hata oluştu.');
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">✍️ Yazar Yönetimi</h1>

        {/* Yeni Yazar Ekleme Formu */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-end max-w-4xl">
          {['name', 'nation', 'birthYear'].map((field) => (
            <div key={field} className="flex flex-col flex-1">
              <label className="text-sm text-gray-600 mb-1 font-medium">
                {field === 'name'
                  ? 'Ad'
                  : field === 'nation'
                  ? 'Ülke'
                  : 'Doğum Yılı'}
              </label>
              <input
                type={field === 'birthYear' ? 'number' : 'text'}
                value={newAuthor[field]}
                placeholder={
                  field === 'name'
                    ? 'Yazar adı'
                    : field === 'nation'
                    ? 'Ülke'
                    : 'YYYY'
                }
                onChange={handleInputChange(setNewAuthor, field)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
          ))}
          <button
            onClick={handleCreate}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition whitespace-nowrap"
          >
            Ekle
          </button>
        </div>

        {/* Yazarlar Tablosu */}
        {loading ? (
          <p className="text-gray-500 animate-pulse">Yükleniyor...</p>
        ) : authors.length === 0 ? (
          <p className="text-gray-500">Henüz yazar bulunmuyor.</p>
        ) : (
          <div className="overflow-x-auto rounded shadow border border-gray-200">
            <table className="min-w-full bg-white text-sm">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">ID</th>
                  <th className="px-6 py-3 text-left font-medium">Ad</th>
                  <th className="px-6 py-3 text-left font-medium">Ülke</th>
                  <th className="px-6 py-3 text-left font-medium">Doğum Yılı</th>
                  <th className="px-6 py-3 text-left font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {authors.map((author) => (
                  <tr key={author.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-800">{author.id}</td>
                    {['name', 'nation', 'birthOfYear'].map((field) => (
                      <td key={field} className="px-6 py-4">
                        {editAuthorId === author.id ? (
                          <input
                            type={field === 'birthYear' ? 'number' : 'text'}
                            value={editAuthor[field]}
                            onChange={handleInputChange(setEditAuthor, field)}
                            className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-blue-400"
                          />
                        ) : (
                          author[field]
                        )}
                      </td>
                    ))}
                    <td className="px-6 py-4 space-x-2 whitespace-nowrap">
                      {editAuthorId === author.id ? (
                        <>
                          <button
                            onClick={() => handleUpdate(author.id)}
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                          >
                            Kaydet
                          </button>
                          <button
                            onClick={() => {
                              setEditAuthorId(null);
                              setEditAuthor(initialAuthor);
                            }}
                            className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
                          >
                            İptal
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditClick(author)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                          >
                            Düzenle
                          </button>
                          <button
                            onClick={() => handleDelete(author.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                          >
                            Sil
                          </button>
                        </>
                      )}
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

export default AdminAuthorsPage;
