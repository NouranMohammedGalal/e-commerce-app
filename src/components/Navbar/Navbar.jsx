import { Link, NavLink, useNavigate } from "react-router-dom";
import logoImage from "../../assets/images/freshcart-logo.svg";
import { useContext } from "react";
import { AuthTokenContext } from "../../Context/AuthTokenContext";

export default function Navbar() {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/cart", label: "Cart" },
    { to: "/product", label: "Products" },
    { to: "/category", label: "Categories" },
    { to: "/brand", label: "Brands" },
  ];

  let { token, setToken } = useContext(AuthTokenContext);
  let navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }
  return (
    <nav className="bg-white border-gray-200 shadow">
      <div className="max-w-screen-xl flex  items-center mx-auto p-4">
        {/* flex-wrap */}
        <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logoImage} className="h-8" />
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className="hidden w-full md:flex md:justify-between md:items-center gap-4 flex-grow"
          id="navbar-default"
        >
          {token && (
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-3 text-active"
                        : "block py-2 px-3"
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}

          <ul className="font-medium ms-auto flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white items-center">
            <li className="space-x-3">
              <a href="" className="fa-brands fa-instagram"></a>
              <a href="" className="fa-brands fa-facebook"></a>
              <a href="" className="fa-brands fa-tiktok"></a>
              <a href="" className="fa-brands fa-twitter"></a>
              <a href="" className="fa-brands fa-youtube"></a>
            </li>
            {token ? (
              <li>
                <button className="block py-2 px-3" onClick={logout}>
                  SignOut
                </button>
              </li>
            ) : (
              <>
                <li>
                  <button className="block py-2 px-3">
                    <Link to="/login">Login</Link>
                  </button>
                </li>
                <li>
                  <button className="block py-2 px-3">
                    <Link to="/register">Register</Link>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
