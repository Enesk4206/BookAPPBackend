import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import {
  createGenre,
  updateGenre,
  deleteGenre,
  getAllGenres,
} from '../api/genreService.js';

const AdminGenresPage = () => {
  const [genres, setGenres] = useState([]);
  const [newGenreName, setNewGenreName] = useState('');
  const [editGenreId, setEditGenreId] = useState(null);
  const [editGenreName, setEditGenreName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    setLoading(true);
    try {
      const data = await getAllGenres();
      setGenres(data);
    } catch (error) {
      alert('Genrelere ulaşırken hata oluştu');
    }
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!newGenreName.trim()) {
      alert('Genre adı boş olamaz');
      return;
    }
    try {
      const created = await createGenre({ name: newGenreName });
      setGenres(prev => [...prev, created]);
      setNewGenreName('');
    } catch (error) {
      alert('Genre eklenirken hata oluştu');
    }
  };

  const handleEditClick = (genre) => {
    setEditGenreId(genre.id);
    setEditGenreName(genre.name);
  };

  const handleUpdate = async (id) => {
    if (!editGenreName.trim()) {
      alert('Genre adı boş olamaz');
      return;
    }
    try {
      const updated = await updateGenre(id, { name: editGenreName });
      setGenres(prev => prev.map(g => (g.id === id ? updated : g)));
      setEditGenreId(null);
      setEditGenreName('');
    } catch (error) {
      alert('Genre güncellenirken hata oluştu');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bu türü silmek istediğinize emin misiniz?')) return;
    try {
      await deleteGenre(id);
      setGenres(prev => prev.filter(g => g.id !== id));
    } catch (error) {
      alert('Genre silinirken hata oluştu');
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">🎭 Tür Yönetimi</h1>

        {/* Yeni Genre Ekleme */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <input
            type="text"
            placeholder="Yeni tür adı"
            value={newGenreName}
            onChange={(e) => setNewGenreName(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full sm:w-64"
          />
          <button
            onClick={handleCreate}
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
          >
            Ekle
          </button>
        </div>

        {/* Genre Tablosu */}
        {loading ? (
          <div className="text-gray-600">Yükleniyor...</div>
        ) : (
          <div className="overflow-x-auto rounded shadow">
            <table className="min-w-full bg-white border border-gray-200 text-sm">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-3 text-left">ID</th>
                  <th className="px-6 py-3 text-left">Ad</th>
                  <th className="px-6 py-3 text-left">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {genres.map((genre) => (
                  <tr key={genre.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-800">{genre.id}</td>
                    <td className="px-6 py-4">
                      {editGenreId === genre.id ? (
                        <input
                          type="text"
                          value={editGenreName}
                          onChange={(e) => setEditGenreName(e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                        />
                      ) : (
                        genre.name
                      )}
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      {editGenreId === genre.id ? (
                        <>
                          <button
                            onClick={() => handleUpdate(genre.id)}
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                          >
                            Kaydet
                          </button>
                          <button
                            onClick={() => {
                              setEditGenreId(null);
                              setEditGenreName('');
                            }}
                            className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
                          >
                            İptal
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditClick(genre)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                          >
                            Düzenle
                          </button>
                          <button
                            onClick={() => handleDelete(genre.id)}
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

export default AdminGenresPage;
