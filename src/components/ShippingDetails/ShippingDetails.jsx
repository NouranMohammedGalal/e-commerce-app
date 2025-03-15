import axios from "axios";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

export default function ShippingDetails() {
  let { cartId } = useParams();
  const baseUrl = "https://ecommerce.routemisr.com";

  let initialValues = {
    details: "",
    phone: "",
    city: "",
  };

  let validationSchema = Yup.object({
    details: Yup.string().required("details is required"),
    city: Yup.string().required("city is required"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^(20)?01[1250][0-9]{8}$/, "phone not valid"),
  });
  let shippingFormik = useFormik({
    initialValues,
    onSubmit: checkOutSession,

    validationSchema,
  });
  const headerOptions = {
    headers: {
      token: localStorage.getItem("token"),
    },
  };

  function checkOutSession(values) {
    const redirectUrl = `${window.location.origin}`;
    let data = {
      shippingAddress: values,
    };

    axios
      .post(
        `${baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${redirectUrl}`,
        data,
        headerOptions
      )
      .then((req) => {
        window.open(req.data.session.url, "_self");
      });
  }
  return (
    <div className="w-7/12 mx-auto my-8">
      <h1 className="text-3xl font-medium my-4">Shipping Details : </h1>

      <form onSubmit={shippingFormik.handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="details"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Your details :
          </label>
          <input
            type="text"
            id="details"
            name="details"
            value={shippingFormik.values.details}
            onChange={shippingFormik.handleChange}
            onBlur={shippingFormik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {shippingFormik.touched.details && shippingFormik.errors.details && (
            <p className="text-red-500 text-sm my-1">
              {shippingFormik.errors.details}
            </p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="city"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Your city :
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={shippingFormik.values.city}
            onChange={shippingFormik.handleChange}
            onBlur={shippingFormik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {shippingFormik.touched.city && shippingFormik.errors.city && (
            <p className="text-red-500 text-sm my-1">
              {shippingFormik.errors.city}
            </p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Your phone :
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={shippingFormik.values.phone}
            onChange={shippingFormik.handleChange}
            onBlur={shippingFormik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {shippingFormik.touched.phone && shippingFormik.errors.phone && (
            <p className="text-red-500 text-sm my-1">
              {shippingFormik.errors.phone}
            </p>
          )}
        </div>
        <button
          disabled={!(shippingFormik.isValid && shippingFormik.dirty)}
          type="submit"
          className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-acbg-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-acbg-active disabled:bg-active disabled:opacity-50"
        >
          Pay
        </button>
      </form>
    </div>
  );
}
