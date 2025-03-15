import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useApi(endPoint) {
  function getData(endPoint) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/${endPoint}`);
  }
  let req = useQuery({
    queryKey: [endPoint],
    queryFn: () => getData(endPoint),
  });
  return req;
}
