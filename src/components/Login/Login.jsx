import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AuthTokenContext } from "../../Context/AuthTokenContext";

export default function Login() {
  let { setToken, decodeToken } = useContext(AuthTokenContext);
  let navigate = useNavigate();
  let [errmessage, setErrr] = useState(null);
  const baseUrl = "https://ecommerce.routemisr.com";
  let initialValues = {
    email: "",
    password: "",
  };

  let validationSchema = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("enter valid email"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        "password not valid"
      ),
  });
  let loginFormik = useFormik({
    initialValues,
    onSubmit: loginApi,

    validationSchema,
  });

  function loginApi(data) {
    axios
      .post(`${baseUrl}/api/v1/auth/signin`, data)
      .then((req) => {
        if (req.data.message === "success") {
          setToken(req.data.token);
          localStorage.setItem("token", req.data.token);
          decodeToken(req.data.token);
          navigate("/");
        }
      })
      .catch((err) => {
        setErrr(err.response.data.message);
      });
  }

  return (
    <div className="w-7/12 mx-auto my-8">
      <h1 className="text-3xl font-medium my-4">Login Now : </h1>
      {errmessage && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">{errmessage}</span>
        </div>
      )}

      <form onSubmit={loginFormik.handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            email :
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginFormik.values.email}
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {loginFormik.touched.email && loginFormik.errors.email && (
            <p className="text-red-500 text-sm my-1">
              {loginFormik.errors.email}
            </p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            password :
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginFormik.values.password}
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {loginFormik.touched.password && loginFormik.errors.password && (
            <p className="text-red-500 text-sm my-1">
              {loginFormik.errors.password}
            </p>
          )}
        </div>
        <Link className="text-sm block mb-3" to="/forgetPassword">
          forgot password ?
        </Link>
        <button
          disabled={!(loginFormik.isValid && loginFormik.dirty)}
          type="submit"
          className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-acbg-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-acbg-active disabled:bg-active disabled:opacity-50"
        >
          Login
        </button>
      </form>
    </div>
  );
}
