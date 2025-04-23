import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import toast, { Toaster } from "react-hot-toast";

export default function ProductDetails() {
  let { id } = useParams();
  let { addUserCart, setNumberCartItem } = useContext(CartContext);
  function getProductDetails(id) {
    return axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/products/${id}`
    );
  }
  let { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: () => getProductDetails(id),
  });

  // function getProductDetails(id) {
  //   axios
  //     .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  //     .then((req) => {
  //       console.log(req.data);
  //       setProduct(req.data.data);
  //     })
  //     .catch();
  // }
  console.log(data);
  console.log("isLoading", isLoading);
  console.log("isFetching", isFetching);
  console.log("isError", isError);
  let product = data?.data?.data;
  function changeImage(e) {
    let image = e.target.src;
    document.getElementById("mainImage").src = image;
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
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center bg-slate-200">
        <span className="loader"></span>
      </div>
    );
  }
  return (
    <>
      <Toaster />
      <div className="mx-auto w-10/12 my-5">
        <div className="flex justify-between items-center ">
          <div className="w-3/12">
            <img
              id="mainImage"
              src={product?.imageCover}
              alt={product?.title}
              className="w-full"
            />
            {/* <Slider dots>
            {product?.images?.map((image, index) => {
              return (
                <div key={index}>
                  <img src={image} className="w-full" />
                </div>
              );
            })}
          </Slider> */}
            <div className="flex w-full h-full mt-2">
              {product?.images?.map((image, index) => {
                return (
                  <div key={index}>
                    <img onClick={changeImage} src={image} className="w-full" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-8/12">
            <h1 className="font-medium text-lg">{product?.title}</h1>
            <p className="text-gray-600 text-sm my-5">{product?.description}</p>
            <h3 className="font-medium mb-2">{product?.category?.name}</h3>
            <div className="flex justify-between">
              <span className="font-normal">{product?.price}EGP</span>
              <span className="text-gray-500">
                <li className="fa-solid fa-star text-yellow-300 " />
                {product?.ratingsAverage}
              </span>
            </div>
            <button onClick={() => addToCart(id)} className="btn mt-5">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
