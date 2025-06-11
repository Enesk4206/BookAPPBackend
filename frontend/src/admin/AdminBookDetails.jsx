import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { getAllBooks, updateBook, deleteBook } from '../api/bookService';
import { getAllAuthors } from '../api/authorService';
import { getAllGenres } from '../api/genreService';

const AdminBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    numberOfPages: '',
    price: '',
    imageFile: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const books = await getAllBooks();
      const current = books.find((b) => b.id === parseInt(id));
      if (!current) return;

      const authorsRes = await getAllAuthors();
      const genresRes = await getAllGenres();

      const currentAuthor = authorsRes.find((a) => a.id === current.authorId);
      setBook(current);
      setAuthors(authorsRes);
      setGenres(genresRes);
      setSelectedAuthor(currentAuthor || null);
      setSelectedGenres(current.genresId || []);

      setFormData({
        name: current.name,
        year: current.year,
        numberOfPages: current.numberOfPages,
        price: current.price,
        imageFile: null,
      });
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, imageFile: e.target.files[0] }));
  };

  const handleToggleGenre = (genreId) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedAuthor) {
      alert('Yazar seçilmedi.');
      return;
    }

    const payload = {
      name: formData.name,
      year: parseInt(formData.year, 10),
      numberOfPages: parseInt(formData.numberOfPages, 10),
      price: parseFloat(formData.price),
      authorId: selectedAuthor.id,
      genresId: selectedGenres,
    };

    const data = new FormData();
    data.append('request', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
    if (formData.imageFile) {
      data.append('imageFile', formData.imageFile);
    }

    try {
      await updateBook(id, data);
      alert('Kitap başarıyla güncellendi.');
      navigate('/admin/books')
    } catch (error) {
      alert('Güncelleme sırasında hata oluştu.');
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Bu kitabı silmek istiyor musunuz?')) {
      try {
        await deleteBook(id);
        alert('Kitap silindi.');
        navigate('/admin/books');
      } catch (error) {
        alert('Silme işlemi sırasında hata oluştu.');
        console.error(error);
      }
    }
  };

  if (!book) return <div className="p-6">Yükleniyor...</div>;
  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">📖 Kitap Detayı</h1>
        <div className="grid md:grid-cols-3 gap-10">
          <form onSubmit={handleUpdate} className="md:col-span-2 bg-white p-6 rounded shadow space-y-6">
            <div>
              <label className="block font-medium text-gray-700">Kitap Adı</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-gray-700">Yıl</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">Sayfa Sayısı</label>
                <input
                  type="number"
                  name="numberOfPages"
                  value={formData.numberOfPages}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-gray-700">Fiyat</label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Yazar</label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={selectedAuthor?.id || ''}
                onChange={(e) =>
                  setSelectedAuthor(authors.find((a) => a.id === parseInt(e.target.value)))
                }
              >
                <option value="">Yazar Seçin</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name} ({author.nation})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700">Türler</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {genres.map((genre) => (
                  <button
                    type="button"
                    key={genre.id}
                    onClick={() => handleToggleGenre(genre.id)}
                    className={`px-3 py-1 rounded-full text-sm border ${
                      selectedGenres.includes(genre.id)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-medium text-gray-700">Yeni Resim</label>
              <input type="file" onChange={handleImageChange} className="mt-2" />
            </div>

            <div className="flex gap-4 mt-6">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Güncelle
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Sil
              </button>
            </div>
          </form>

          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4">Kapak Fotoğrafı</h3>
            {book.imagePath ? (
              <img
                src={`http://localhost:8080${book.imagePath}`}
                alt={book.name}
                className="w-64 h-auto object-cover rounded shadow"
              />
            ) : (
              <div className="text-gray-500">Resim bulunamadı</div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBookDetails;
