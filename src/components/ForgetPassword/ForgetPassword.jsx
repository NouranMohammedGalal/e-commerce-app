import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ForgetPassword() {
  let [displayForm, setDisplayForm] = useState(true);
  let navigate = useNavigate();
  let [errmessage, setErrr] = useState(null);

  const baseUrl = "https://ecommerce.routemisr.com";

  let validationForgetPassword = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("enter valid email"),
  });
  let validationVerifyResetCode = Yup.object({
    resetCode: Yup.string().required("resetCode is required"),
  });

  let forgetFormik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: forgetApi,

    validationSchema: validationForgetPassword,
  });
  let verifyResetCodeFormik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: verifyResetCodeApi,

    validationSchema: validationVerifyResetCode,
  });

  function forgetApi(data) {
    axios
      .post(`${baseUrl}/api/v1/auth/forgotPasswords`, data)
      .then((req) => {
        if (req.data.statusMsg === "success") {
          setDisplayForm(false);
        }
      })
      .catch((err) => {
        setErrr(err.response.data.message);
      });
  }

  function verifyResetCodeApi(data) {
    axios
      .post(`${baseUrl}/api/v1/auth/verifyResetCode`, data)
      .then((req) => {
        if (req.data.status === "Success") {
          navigate("/updatePassword");
        }
      })
      .catch((err) => {
        setErrr(err.response.data.message);
      });
  }

  return (
    <>
      {displayForm ? (
        <div className="w-7/12 mx-auto my-8 min-h-[48vh]">
          <h1 className="text-3xl font-medium my-4">Forget Password : </h1>
          {errmessage && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{errmessage}</span>
            </div>
          )}

          <form onSubmit={forgetFormik.handleSubmit}>
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
                value={forgetFormik.values.email}
                onChange={forgetFormik.handleChange}
                onBlur={forgetFormik.handleBlur}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {forgetFormik.touched.email && forgetFormik.errors.email && (
                <p className="text-red-500 text-sm my-1">
                  {forgetFormik.errors.email}
                </p>
              )}
            </div>

            <button
              disabled={!(forgetFormik.isValid && forgetFormik.dirty)}
              type="submit"
              className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-acbg-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-acbg-active disabled:bg-active disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      ) : (
        <div className="w-7/12 mx-auto my-8">
          <h1 className="text-3xl font-medium my-4"> Verify Reset Code: </h1>
          {errmessage && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{errmessage}</span>
            </div>
          )}

          <form onSubmit={verifyResetCodeFormik.handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="resetCode"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                code :
              </label>
              <input
                type="string"
                id="resetCode"
                name="resetCode"
                value={verifyResetCodeFormik.values.resetCode}
                onChange={verifyResetCodeFormik.handleChange}
                onBlur={verifyResetCodeFormik.handleBlur}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {verifyResetCodeFormik.touched.email &&
                verifyResetCodeFormik.errors.email && (
                  <p className="text-red-500 text-sm my-1">
                    {verifyResetCodeFormik.errors.email}
                  </p>
                )}
            </div>

            <button
              disabled={
                !(verifyResetCodeFormik.isValid && verifyResetCodeFormik.dirty)
              }
              type="submit"
              className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-acbg-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-acbg-active disabled:bg-active disabled:opacity-50"
            >
              Verify Code
            </button>
          </form>
        </div>
      )}
    </>
  );
}
