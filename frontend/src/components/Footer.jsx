import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-8">
      <div className="container mx-auto px-4 py-5">

        {/* Üst - Logo / Site Adı */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold">📚 LibEasy</h2>
        </div>

        {/* Orta - Linkler */}
        <div className="flex justify-center space-x-6 text-sm mb-4">
          <Link to="/" className="hover:text-blue-400 transition">Anasayfa</Link>
          <Link to="/about" className="hover:text-blue-400 transition">Hakkında</Link>
          <Link to="/all-books" className="hover:text-blue-400 transition">Kitaplar</Link>
          <Link to="/all-authors" className="hover:text-blue-400 transition">Yazarlar</Link>
          <Link to="/contact" className="hover:text-blue-400 transition">İletişim</Link>
        </div>

        {/* Alt - Telif */}
        <div className="text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Tüm hakları saklıdır. LibEasy Projesi.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
