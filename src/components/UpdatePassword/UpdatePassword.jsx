import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function UpdatePassword() {
  let navigate = useNavigate();
  let [errmessage, setErrr] = useState(null);
  const baseUrl = "https://ecommerce.routemisr.com";
  let initialValues = {
    email: "",
    newPassword: "",
  };

  let validationSchema = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("enter valid email"),
    newPassword: Yup.string()
      .required("newPassword is required")
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        "newPassword not valid"
      ),
  });
  let updatePasswordFormik = useFormik({
    initialValues,
    onSubmit: updatePasswordApi,

    validationSchema,
  });

  function updatePasswordApi(data) {
    axios
      .put(`${baseUrl}/api/v1/auth/resetPassword`, data)
      .then((req) => {
        if (req.data.token) {
          navigate("/login");
        }
      })
      .catch((err) => {
        setErrr(err.response.data.message);
      });
  }

  return (
    <div className="w-7/12 mx-auto my-8">
      <h1 className="text-3xl font-medium my-4">Update Password Now : </h1>
      {errmessage && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">{errmessage}</span>
        </div>
      )}

      <form onSubmit={updatePasswordFormik.handleSubmit}>
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
            value={updatePasswordFormik.values.email}
            onChange={updatePasswordFormik.handleChange}
            onBlur={updatePasswordFormik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {updatePasswordFormik.touched.email &&
            updatePasswordFormik.errors.email && (
              <p className="text-red-500 text-sm my-1">
                {updatePasswordFormik.errors.email}
              </p>
            )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="newPassword"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            newPassword :
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={updatePasswordFormik.values.newPassword}
            onChange={updatePasswordFormik.handleChange}
            onBlur={updatePasswordFormik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {updatePasswordFormik.touched.newPassword &&
            updatePasswordFormik.errors.newPassword && (
              <p className="text-red-500 text-sm my-1">
                {updatePasswordFormik.errors.password}
              </p>
            )}
        </div>
        <button
          disabled={
            !(updatePasswordFormik.isValid && updatePasswordFormik.dirty)
          }
          type="submit"
          className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-acbg-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-acbg-active disabled:bg-active disabled:opacity-50"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
