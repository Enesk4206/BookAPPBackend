import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { createGenre, updateGenre, deleteGenre, getAllGenres } from '../api/genreService.js';

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
    if (!window.confirm('Bu genreyı silmek istediğinize emin misiniz?')) return;
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
        <h1 className="text-2xl font-bold mb-6">Genre Yönetimi</h1>

        {/* Yeni Genre Ekleme */}
        <div className="mb-6 flex gap-2">
          <input
            type="text"
            placeholder="Yeni genre adı"
            value={newGenreName}
            onChange={(e) => setNewGenreName(e.target.value)}
            className="border rounded px-3 py-2 flex-grow"
          />
          <button
            onClick={handleCreate}
            className="bg-green-600 text-white px-4 rounded hover:bg-green-700 transition"
          >
            Ekle
          </button>
        </div>

        {/* Genre Tablosu */}
        {loading ? (
          <div>Yükleniyor...</div>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 rounded">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Ad</th>
                <th className="py-2 px-4 border-b">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {genres.map((genre) => (
                <tr key={genre.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{genre.id}</td>
                  <td className="py-2 px-4 border-b">
                    {editGenreId === genre.id ? (
                      <input
                        type="text"
                        value={editGenreName}
                        onChange={(e) => setEditGenreName(e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      genre.name
                    )}
                  </td>
                  <td className="py-2 px-4 border-b space-x-2">
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
                          className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
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
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminGenresPage;
