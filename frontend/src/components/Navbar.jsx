import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const linkClass = (path) =>
    `hover:text-blue-400 transition ${
      pathname === path ? "text-blue-400 font-semibold" : "text-white"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Kullanıcı adından ilk iki harfi al, büyük harfe çevir
  const getInitials = (username) => {
    if (!username) return "";
    return username.slice(0, 2).toUpperCase();
  };

  return (
    <nav className="bg-gray-800 text-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left Side */}
        <div className="text-xl font-bold">
          <Link to={"/"} className="hover:text-blue-400 transition">
            📚LibEasy
          </Link>
        </div>

        {/* Middle Side */}
        <div className="space-x-6 text-sm">
          <Link to={"/"} className={linkClass("/")}>
            Anasayfa
          </Link>
          <Link to={"/all-books"} className={linkClass("/all-books")}>
            Kitaplar
          </Link>
          <Link to={"/all-authors"} className={linkClass("/all-authors")}>
            Yazarlar
          </Link>
          <Link to={"/about"} className={linkClass("/about")}>
            Hakkımızda
          </Link>
          <Link to={"/contact"} className={linkClass("/contact")}>
            İletişim
          </Link>
        </div>

        {/* Right Side */}
        <div className="space-x-4 text-sm flex items-center">
          {!user && (
            <>
              <Link to={"/login"} className="hover:text-blue-400">
                Giriş Yap
              </Link>
              <Link
                to={"/register"}
                className="bg-blue-500 hover:text-blue-600 px-3 py-1 rounded transition text-white"
              >
                Kaydol
              </Link>
            </>
          )}

          {user && user.role === "USER" && (
            <>

               {/* Profil avatar */}
              <Link
                to={"/profile"}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-semibold uppercase select-none"
                title="Profilim"
              >
                {getInitials(user.username)}
              </Link>

              <Link
                to={"/cart"}
                className="hover:text-blue-400 px-3 py-1 rounded transition text-white border border-blue-400 hover:border-blue-600"
              >
                Sepetim
              </Link>

             

              <button
                onClick={handleLogout}
                className="hover:text-red-500 bg-transparent border-none cursor-pointer"
              >
                Çıkış
              </button>
            </>
          )}

          {user && user.role === "ADMIN" && (
            <>

             {/* Profil avatar */}
              <Link
                to={"/profile"}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-semibold uppercase select-none"
                title="Profilim"
              >
                {getInitials(user.username)}
              </Link>

              <Link to={"/admin/dashboard"} className="hover:text-blue-400">
                Panel
              </Link>

             

              <button
                onClick={handleLogout}
                className="hover:text-red-500 bg-transparent border-none cursor-pointer"
              >
                Çıkış
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
