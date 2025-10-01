import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice"; // adjust path if needed

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // For mobile menu toggle
  const menuRef = useRef(null);
  const [menuHeight, setMenuHeight] = useState(0);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const isActive = (path) =>
    location.pathname === path
      ? "text-light-300 font-bold bg-blue-700 p-2 rounded"
      : "hover:text-yellow-300 p-2 rounded";

  // Set menu height for smooth animation
  useEffect(() => {
    if (menuRef.current) {
      setMenuHeight(menuRef.current.scrollHeight);
    }
  }, [menuRef, isOpen]);

  return (
    <nav className="bg-blue-800 text-white px-6 py-3 sticky top-0 z-50 shadow-md">
      <div className="flex justify-between items-center">
        {/* Left: Logo and Links */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-bold hover:text-yellow-300">
            EXCEL ANALYTICS
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-4">
            <Link to="/" className={isActive("/")}>
              Home
            </Link>
            {user && (
              <Link to="/dashboard" className={isActive("/dashboard")}>
                Dashboard
              </Link>
            )}
            {user?.role === "admin" && (
              <Link to="/admin" className={isActive("/admin")}>
                AdminPanel
              </Link>
            )}
          </div>
        </div>

        {/* Right: Auth buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
              <Link to="/login" className={isActive("/login")}>
                Login
              </Link>
              <Link to="/register" className={isActive("/register")}>
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm">
                Hi, <strong>{user.name}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu with Smooth Slide Animation */}
      <div
        ref={menuRef}
        style={{
          maxHeight: isOpen ? `${menuHeight}px` : "0px",
        }}
        className="overflow-hidden transition-max-height duration-300 ease-in-out md:hidden mt-2"
      >
        <div className="flex flex-col space-y-2">
          <Link
            to="/"
            className="block hover:text-yellow-300"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          {user && (
            <Link
              to="/dashboard"
              className={isActive("/dashboard")}
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
          )}
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className={isActive("/admin")}
              onClick={() => setIsOpen(false)}
            >
              AdminPanel
            </Link>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                className={isActive("/login")}
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={isActive("/register")}
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="w-full text-left bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
