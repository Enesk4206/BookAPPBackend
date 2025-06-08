import React from 'react'
import { Link, useLocation } from 'react-router-dom'

// Örnek: Kullanıcı durumu
const isLoggedIn = false; // burayı gerçek login durumuna göre değiştireceksin

const Navbar = () => {
  const {pathname} = useLocation();

  const linkClass = (path) => 
    `hover:text-blue-400 transition ${
      pathname === path ? "text-blue-400 font-semibold" : "text-white"
    }`;
    
  return (
    <nav className='bg-gray-800 text-white shadow'>
      <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
        
        {/* Left Side */}
        <div className='text-xl font-bold'>
          <Link to={"/"} className='hover:text-blue-400 transition'>
              📚LibEasy
          </Link>
        </div>

        {/* Middle Side */}
        <div className='space-x-6 text-sm'>
          <Link to={"/"} className={linkClass("/")}>Anasayfa</Link>
          <Link to={"/all-books"} className={linkClass("/all-books")}>Kitaplar</Link>
          <Link to={"/all-authors"} className={linkClass("/all-authors")}>Yazarlar</Link>
          <Link to={"/about"} className={linkClass("/about")}>Hakkımızda</Link>
          <Link to={"/contact"} className={linkClass("/contact")}>İletişim</Link>
        </div>

        {/* Right Side */}
        <div className='space-x-4 text-sm flex items-center'>
          {isLoggedIn ? (
            <>
              <Link to={"/cart"} className='hover:text-blue-400 px-3 py-1 rounded transition text-white border border-blue-400 hover:border-blue-600'>
                Sepetim
              </Link>
              <Link to={"/profile"} className='hover:text-blue-400'>Profil</Link>
              <Link to={"/logout"} className='hover:text-red-500'>Çıkış</Link>
            </>
          ) : (
            <>
              <Link to={"/login"} className='hover:text-blue-400'>Giriş Yap</Link>
              <Link to={"/register"} className='bg-blue-500 hover:text-blue-600 px-3 py-1 rounded transition text-white'>Kaydol</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
