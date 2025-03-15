import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  let [cartData, setCartData] = useState(null);
  let [isLoading, setIsLoading] = useState(true);
  let {
    getUserCart,
    deleteUserCart,
    setNumberCartItem,
    clearUserCart,
    updateUserCartItemQty,
  } = useContext(CartContext);
  function getCartData() {
    setIsLoading(true);
    getUserCart()
      .then((req) => {
        setCartData(req.data.data);
        setIsLoading(false);
      })
      .catch((err) => {});
  }
  useEffect(() => {
    getCartData();
  }, []);

  function deleteCartItem(id) {
    deleteUserCart(id)
      .then((req) => {
        console.log(req.data);
        setCartData(req.data.data);
        setNumberCartItem(req.data.numOfCartItems);
        toast.success("Product Deleted Successfully");
      })
      .catch((err) => {});
  }

  function clearCart() {
    clearUserCart()
      .then((req) => {
        if (req.data.message === "success") {
          setCartData(null);
          setNumberCartItem(null);
          toast.success("Cart Cleared Successfully");
        }
      })
      .catch((err) => {});
  }

  function updateCartItem(id, qty) {
    document.getElementById(id).innerHTML =
      '<i class="fa-solid fa-spinner text-active"></i>';
    updateUserCartItemQty(id, qty)
      .then((req) => {
        console.log(req.data, "cart");
        setCartData(req.data.data);
        setNumberCartItem(req.data.numOfCartItems);
        document.getElementById(id).innerHTML = qty;
      })
      .catch((err) => {});
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
      {cartData?.products?.length > 0 ? (
        <div className="w-10/12 mx-auto bg-gray-200 my-5">
          <h1 className="font-medium text-3xl mt-3 p-5">Shop Cart</h1>
          <div className="flex justify-between">
            <h2 className="text-active text-2xl px-5">
              Total Cart Price : {cartData.totalCartPrice}
            </h2>
            <button
              onClick={clearCart}
              className="text-white bg-red-500 text-xl px-4 me-5 rounded"
            >
              Clear Cart
            </button>
          </div>

          <div className="divide-y-2 divide-gray-300">
            {cartData.products?.map((item) => {
              return (
                <div
                  key={item._id}
                  className="flex justify-between items-center py-3"
                >
                  <div className="w-10/12 pl-5">
                    <div className="flex justify-between items-center">
                      <div className="w-1/12">
                        <img
                          src={item.product.imageCover}
                          alt=""
                          className="w-full"
                        />
                      </div>
                      <div className="w-10/12 space-y-2 ">
                        <h2>{item.product.title}</h2>
                        <h2 className="text-active">
                          Price : {item.price} EGP
                        </h2>
                        <button
                          onClick={() => deleteCartItem(item.product._id)}
                          className="hover:border rounded hover:border-red-500 hover:bg-red-500 hover:text-white hover:px-2 py-1 group"
                        >
                          <i className="fa-solid fa-trash-can text-active group-hover:text-white mr-2"></i>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="w-2/12">
                    <i
                      onClick={() =>
                        updateCartItem(item.product._id, item.count + 1)
                      }
                      className="fa-solid border border-active rounded px-1 py-[6px] cursor-pointer fa-plus"
                    ></i>
                    <span id={item.product._id} className="mx-2">
                      {item.count}
                    </span>
                    <i
                      onClick={() =>
                        updateCartItem(item.product._id, item.count - 1)
                      }
                      className="fa-solid border border-active rounded px-1 py-[6px] cursor-pointer fa-minus"
                    ></i>
                  </div>
                </div>
              );
            })}
            <Link
              to={`/shippingDetails/${cartData._id}`}
              className="btn block text-center"
            >
              Pay <i className=" fa-brands fa-cc-visa"></i>
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-10/12 mx-auto my-6 bg-gray-200 pb-5">
          <h1 className="font-medium text-3xl mt-3 p-5">Shop Cart</h1>
          <h2 className="text-active text-2xl px-5">Your Cart is Empty</h2>
        </div>
      )}
    </>
  );
}
