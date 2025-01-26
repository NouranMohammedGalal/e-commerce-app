import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Product from "./components/Product/Product";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import NotFound from "./components/NotFound/NotFound";
import Brand from "./components/Brand/Brand";
import Category from "./components/Category/Category";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";
import AuthTokenContext from "./Context/AuthTokenContext";
import ProtectedRouting from "./ProtectedRouting/ProtectedRouting";

function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRouting>
              <Home />
            </ProtectedRouting>
          ),
        },
        {
          path: "product",
          element: (
            <ProtectedRouting>
              <Product />
            </ProtectedRouting>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRouting>
              <Cart />{" "}
            </ProtectedRouting>
          ),
        },
        {
          path: "brand",
          element: (
            <ProtectedRouting>
              <Brand />{" "}
            </ProtectedRouting>
          ),
        },
        {
          path: "category",
          element: (
            <ProtectedRouting>
              <Category />
            </ProtectedRouting>
          ),
        },
        { path: "login", element: <Login /> },
        { path: "register", element: <SignUp /> },
        { path: "forgetPassword", element: <ForgetPassword /> },
        { path: "updatePassword", element: <UpdatePassword /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <AuthTokenContext>
      <RouterProvider router={router} />
    </AuthTokenContext>
  );
}

export default App;
