import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import BookPage from "./pages/Book/BookPage"
import AuthorPage from "./pages/Book/AuthorPage"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import BookDetailsPage from './pages/Book/BookDetailsPage'
import CartPage from './pages/CartPage'
import AuthorDetailsPage from './pages/Book/AuthorDetailsPage'
import AdminDashboardPage from './admin/AdminDashboardPage'
import AdminBooksPage from './admin/AdminBooksPage'
import AdminAuthorsPage from './admin/AdminAuthorsPage'
import AdminGenresPage from './admin/AdminGenresPage'

const App = () => {
  //flex-grow:
  //container:

  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
        <Navbar/>
        <main className='flex-grow container mx-auto px-4 py-6'>
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/about' element={<AboutPage/>} />
            <Route path='/contact' element={<ContactPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path='/all-books' element={<BookPage/>}/>
            <Route path='/book-details/:id' element={<BookDetailsPage/>}/>
            <Route path='/all-authors' element={<AuthorPage/>}/>
            <Route path='/author-details/:authorId' element={<AuthorDetailsPage/>}/>
            <Route path='/cart' element={<CartPage/>}/>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/books" element={<AdminBooksPage />} />
            <Route path="/admin/authors" element={<AdminAuthorsPage />} />
            <Route path="/admin/genres" element={<AdminGenresPage />} />

          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  )
}

export default App