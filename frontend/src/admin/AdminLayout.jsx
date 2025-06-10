import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiBook, FiUser, FiTag, FiSettings, FiLogOut, FiChevronDown, FiChevronRight, FiBell } from 'react-icons/fi';

const AdminLayout = ({ children }) => {
  const [expandedMenus, setExpandedMenus] = useState({});
  const location = useLocation();

  const toggleMenu = (menu) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: <FiHome className="mr-3" />
    },
    {
      name: 'Kitaplar',
      path: '/admin/books',
      icon: <FiBook className="mr-3" />,
      subItems: [
        { name: 'Tüm Kitaplar', path: '/admin/books/all' },
        { name: 'Yeni Ekle', path: '/admin/books/new' }
      ]
    },
    {
      name: 'Yazarlar',
      path: '/admin/authors',
      icon: <FiUser className="mr-3" />
    },
    {
      name: 'Türler',
      path: '/admin/genres',
      icon: <FiTag className="mr-3" />
    },
    {
      name: 'Ayarlar',
      path: '/admin/settings',
      icon: <FiSettings className="mr-3" />
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-800 text-white shadow-lg flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-bold flex items-center">
            <span className="bg-white text-indigo-800 rounded-full w-8 h-8 flex items-center justify-center mr-2">A</span>
            Admin Panel
          </h2>
        </div>
        
        <nav className="flex-1 px-4 pb-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.name}>
              <Link 
                to={item.path}
                onClick={() => item.subItems && toggleMenu(item.name)}
                className={`flex items-center justify-between p-3 rounded-lg transition-colors ${isActive(item.path) ? 'bg-indigo-900' : 'hover:bg-indigo-700'}`}
              >
                <div className="flex items-center">
                  {item.icon}
                  <span>{item.name}</span>
                </div>
                {item.subItems && (
                  expandedMenus[item.name] ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />
                )}
              </Link>
              
              {item.subItems && expandedMenus[item.name] && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      className={`block p-2 rounded-lg transition-colors ${isActive(subItem.path) ? 'bg-indigo-900' : 'hover:bg-indigo-700'}`}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-indigo-700">
          <button className="flex items-center w-full p-3 rounded-lg hover:bg-indigo-700 transition-colors">
            <FiLogOut className="mr-3" />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Hoş Geldiniz, Admin!</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="text-gray-600 hover:text-gray-900">
                <FiBell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-medium">A</div>
              <span className="text-sm font-medium">Admin</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;