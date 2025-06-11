import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';

import { getAllBooks } from '../api/bookService';
import { getAllAuthors } from '../api/authorService';

const AdminDashboardPage = () => {
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalAuthors, setTotalAuthors] = useState(0);

  useEffect(() => {
    getAllBooks()
      .then(data => setTotalBooks(data.length))
      .catch(() => setTotalBooks(0));

    getAllAuthors()
      .then(data => setTotalAuthors(data.length))
      .catch(() => setTotalAuthors(0));
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 shadow rounded-2xl">
          <h2 className="text-lg font-semibold">Toplam Kitap</h2>
          <p className="text-2xl text-blue-600">{totalBooks}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-2xl">
          <h2 className="text-lg font-semibold">Toplam Yazar</h2>
          <p className="text-2xl text-green-600">{totalAuthors}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-2xl">
          <h2 className="text-lg font-semibold">Sepettekiler</h2>
          <p className="text-2xl text-yellow-600">15</p>
        </div>
        <div className="bg-white p-4 shadow rounded-2xl">
          <h2 className="text-lg font-semibold">Kullanıcılar</h2>
          <p className="text-2xl text-red-600">-</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
