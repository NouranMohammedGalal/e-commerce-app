import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import useApi from "../../Hooks/useApi";

export default function CategorySlider() {
  // let [categoryList, setCategoryList] = useState([]);
  const sliderSettings = {
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: false,
    dots: true,
  };
  let { data } = useApi("categories");
  let categoryList = data?.data?.data;
  // function getCategories() {
  //   axios
  //     .get("https://ecommerce.routemisr.com/api/v1/categories")
  //     .then((req) => {
  //       setCategoryList(req.data.data);
  //     })
  //     .catch(() => {});
  // }
  // useEffect(() => {
  //   getCategories();
  // }, []);

  return (
    <div className="mx-auto my-5">
      <h1 className="font-medium text-lg mb-1">Shop Popular Categories</h1>
      <Slider {...sliderSettings}>
        {categoryList?.map((category) => (
          <div key={category._id} className="flex flex-row items-center">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-48 object-fill "
            />
            <h5> {category.name}</h5>
          </div>
        ))}
      </Slider>
    </div>
  );
}
