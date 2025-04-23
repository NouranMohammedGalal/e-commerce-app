import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../../Context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function Product() {
  let [paginationPages, setPaginationPages] = useState("1");
  let { addUserCart, setNumberCartItem } = useContext(CartContext);

  function getProducts() {
    return axios.get(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/api/v1/products?limit=30&page=${paginationPages}`
    );
  }

  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["productsPage", paginationPages],
    queryFn: getProducts,
  });

  function handlePageClick(e) {
    let page = e.target.getAttribute("page");
    setPaginationPages(page);
  }

  function addToCart(id) {
    addUserCart(id)
      .then((req) => {
        console.log(req.data.numOfCartItems);
        setNumberCartItem(req.data.numOfCartItems);
        toast.success(req.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  if (isError) {
    return <h1 className="text-red-600">{error.response.data.message}</h1>;
  }
  let productList = data?.data?.data;
  return (
    <>
      <Toaster />
      <Helmet>
        <title>Products</title>
      </Helmet>
      {isLoading ? (
        <div className="h-screen flex justify-center items-center bg-slate-200">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="w-10/12 mx-auto my-6">
          <div className="flex flex-wrap">
            {productList.map((product) => {
              let { _id, title, imageCover, price, category, ratingsAverage } =
                product;
              let { name } = category;
              return (
                <div
                  key={_id}
                  className="lg:w-2/12 md:w-3/12 sm:w-6/12 w-full px-2 mb-3"
                >
                  <div className="group overflow-hidden hover:border hover:border-active px-2 mb-3">
                    <Link to={`/productDetails/${_id}`}>
                      <img className="w-full " src={imageCover} alt={title} />
                      <h5 className="text-active">{name}</h5>
                      <h2>{title.split(" ").slice(0, 2).join(" ")}</h2>
                      <div className="flex justify-between">
                        <span className="font-bold">{price}EGP</span>
                        <span className="text-gray-500">
                          <li className="fa-solid fa-star text-yellow-300 " />
                          {ratingsAverage}
                        </span>
                      </div>
                    </Link>
                    <button
                      onClick={() => addToCart(_id)}
                      className="btn mt-3 duration-500 translate-y-24 group-hover:-translate-y-2"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <nav aria-label="Page navigation example">
            <ul className="flex justify-center items-center -space-x-px h-8 text-sm cursor-pointer">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="w-2.5 h-2.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                </a>
              </li>
              {new Array(data?.data?.metadata?.numberOfPages)
                ?.fill("")
                ?.map((_, i) => (
                  <li key={i} onClick={handlePageClick}>
                    <a
                      page={i + 1}
                      className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      {i + 1}
                    </a>
                  </li>
                ))}

              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="w-2.5 h-2.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
