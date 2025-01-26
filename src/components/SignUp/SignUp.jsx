import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function SignUp() {
  let navigate = useNavigate();
  let [errmessage, setErrr] = useState(null);
  const baseUrl = "https://ecommerce.routemisr.com";
  let initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  let validationSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "minimum character is 3")
      .max(20, "maximum character is 20"),
    email: Yup.string()
      .required("email is required")
      .email("enter valid email"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        "password not valid"
      ),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password"), "rePassword not match password"]),
    // number not starts with 0
    phone: Yup.string()
      .required("phone is required")
      .matches(/^(20)?01[1250][0-9]{8}$/, "phone not valid"),
  });
  let registerFormik = useFormik({
    initialValues,
    onSubmit: registerApi,
    // validate: function (data) {
    //   let errors = {};
    //   if (data.password !== data.rePassword) {
    //     errors.rePassword = "password not match";
    //   }
    //   return errors;
    // },
    validationSchema,
  });

  function registerApi(data) {
    axios
      .post(`${baseUrl}/api/v1/auth/signup`, data)
      .then((req) => {
        if (req.data.message === "success") {
          navigate("/login");
        }
      })
      .catch((err) => {
        setErrr(err.response.data.message);
      });
  }

  return (
    <div className="w-7/12 mx-auto my-8">
      <h1 className="text-3xl font-medium my-4">Register Now : </h1>
      {errmessage && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">{errmessage}</span>
        </div>
      )}

      <form onSubmit={registerFormik.handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            name :
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={registerFormik.values.name}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {registerFormik.touched.name && registerFormik.errors.name && (
            <p className="text-red-500 text-sm my-1">
              {registerFormik.errors.name}
            </p>
          )}
        </div>
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
            value={registerFormik.values.email}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {registerFormik.touched.email && registerFormik.errors.email && (
            <p className="text-red-500 text-sm my-1">
              {registerFormik.errors.email}
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
            value={registerFormik.values.password}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {registerFormik.touched.password &&
            registerFormik.errors.password && (
              <p className="text-red-500 text-sm my-1">
                {registerFormik.errors.password}
              </p>
            )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="rePassword"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            rePassword :
          </label>
          <input
            type="password"
            id="rePassword"
            name="rePassword"
            value={registerFormik.values.rePassword}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {registerFormik.touched.rePassword &&
            registerFormik.errors.rePassword && (
              <p className="text-red-500 text-sm my-1">
                {registerFormik.errors.rePassword}
              </p>
            )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Phone :
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={registerFormik.values.phone}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {registerFormik.touched.phone && registerFormik.errors.phone && (
            <p className="text-red-500 text-sm my-1">
              {registerFormik.errors.phone}
            </p>
          )}
        </div>

        <button
          disabled={!(registerFormik.isValid && registerFormik.dirty)}
          type="submit"
          className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-acbg-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-acbg-active disabled:bg-active disabled:opacity-50"
        >
          Register
        </button>
      </form>
    </div>
  );
}
