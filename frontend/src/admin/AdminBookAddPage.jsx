import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { createBook } from '../api/bookService';
import { getAllAuthors } from '../api/authorService';
import { getAllGenres } from '../api/genreService';

const AdminBookAddPage = () => {
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);

  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [authorSearch, setAuthorSearch] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const [selectedGenres, setSelectedGenres] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    year: '',
    numberOfPages: '',
    price: '',
    imageFile: null,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAuthors();
    fetchGenres();
  }, []);

  const fetchAuthors = async () => {
    try {
      const data = await getAllAuthors();
      setAuthors(data);
      setFilteredAuthors(data);
    } catch (error) {
      alert('Yazarlar alınırken hata oluştu.');
    }
  };

  const fetchGenres = async () => {
    try {
      const data = await getAllGenres();
      setGenres(data);
    } catch (error) {
      alert('Türler alınırken hata oluştu.');
    }
  };

  // Yazar arama inputu değiştiğinde filtrele
  const handleAuthorSearch = (e) => {
    const value = e.target.value;
    setAuthorSearch(value);

    // Eğer kullanıcı yazar seçmeden arama yapıyorsa, seçimi iptal et
    setSelectedAuthor(null);

    if (!value.trim()) {
      setFilteredAuthors(authors);
      return;
    }

    const filtered = authors.filter((a) =>
      a.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredAuthors(filtered);
  };

  // Yazar seçildiğinde inputu güncelle ve seçim yap
  const handleSelectAuthor = (author) => {
    setSelectedAuthor(author);
    setAuthorSearch(author.name);
    setFilteredAuthors([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, imageFile: file }));
  };

  const handleToggleGenre = (genreId) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.year.trim() ||
      !formData.numberOfPages.trim() ||
      !formData.price.trim() ||
      !selectedAuthor ||
      selectedGenres.length === 0
    ) {
      alert('Lütfen tüm alanları doldurun ve yazar ile tür seçin.');
      return;
    }

    setLoading(true);

    try {
      const bookPayload = {
        name: formData.name.trim(),
        year: parseInt(formData.year, 10),
        numberOfPages: parseInt(formData.numberOfPages, 10),
        price: parseFloat(formData.price),
        authorId: selectedAuthor.id,
        genreIds: selectedGenres,
      };

      // FormData oluştur
      const formDataToSend = new FormData();
      formDataToSend.append(
        'request',
        new Blob([JSON.stringify(bookPayload)], { type: 'application/json' })
      );
      if (formData.imageFile) {
        formDataToSend.append('imageFile', formData.imageFile);
      }

      await createBook(formDataToSend);

      alert('Kitap başarıyla eklendi!');

      // Formu temizle ve önizleme URL'lerini temizle
      setFormData({
        name: '',
        year: '',
        numberOfPages: '',
        price: '',
        imageFile: null,
      });
      setAuthorSearch('');
      setSelectedAuthor(null);
      setSelectedGenres([]);
      setFilteredAuthors(authors);
    } catch (error) {
      alert('Kitap eklenirken hata oluştu.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-semibold mb-8 text-gray-800">📚 Kitap Ekle</h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
          {/* Kitap Adı */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Kitap Adı</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Kitap adı"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Yıl */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Yıl</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="Yayın yılı"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              min="0"
              required
            />
          </div>

          {/* Sayfa Sayısı */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Sayfa Sayısı</label>
            <input
              type="number"
              name="numberOfPages"
              value={formData.numberOfPages}
              onChange={handleChange}
              placeholder="Sayfa sayısı"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              min="1"
              required
            />
          </div>

          {/* Fiyat */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Fiyat (₺)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Fiyat"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Yazar Arama / Seçim */}
          <div className="relative">
            <label className="block mb-1 font-medium text-gray-700">Yazar</label>
            <input
              type="text"
              value={authorSearch}
              onChange={handleAuthorSearch}
              placeholder="Yazar adı yazıp seçiniz"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              autoComplete="off"
              required
            />
            {filteredAuthors.length > 0 && authorSearch.trim() !== '' && (
              <ul className="absolute z-10 bg-white border border-gray-300 w-full max-h-48 overflow-auto rounded shadow mt-1">
                {filteredAuthors.map((author) => (
                  <li
                    key={author.id}
                    onClick={() => handleSelectAuthor(author)}
                    className="cursor-pointer px-3 py-2 hover:bg-blue-600 hover:text-white"
                  >
                    {author.name} ({author.nation})
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Türler Çoklu Seçim */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">Türler</label>
            <div className="flex flex-wrap gap-3">
              {genres.map((genre) => {
                const selected = selectedGenres.includes(genre.id);
                return (
                  <button
                    key={genre.id}
                    type="button"
                    onClick={() => handleToggleGenre(genre.id)}
                    className={`px-3 py-1 rounded-full border transition ${
                      selected
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-100'
                    }`}
                  >
                    {genre.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Resim alanı */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Kitap Kapak Fotoğrafı</label>
            <div className="flex items-center gap-4">
              <label
                htmlFor="image-upload"
                className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Dosya Seç
              </label>
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              {formData.imageFile && (
                <div className="flex items-center gap-2">
                  <img
                    src={URL.createObjectURL(formData.imageFile)}
                    alt="Önizleme"
                    className="w-16 h-16 object-cover rounded border"
                  />
                  <span className="text-gray-700">{formData.imageFile.name}</span>
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, imageFile: null }))}
                    className="text-red-600 hover:text-red-800 font-bold text-xl leading-none"
                    title="Dosyayı kaldır"
                  >
                    &times;
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded text-white font-semibold ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
              } transition`}
            >
              {loading ? 'Kaydediliyor...' : 'Kitabı Ekle'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminBookAddPage;
