import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../component/Navbar.js/Navbar";

export default function Product() {
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("tokenId"));
    console.log(token, "token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  const params = useParams();
  console.log(params.id);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://fakestoreapi.com/products/${params.id.slice(1)}`
      );
      const data = await response.json();
      setProduct(data);
    };
    fetchData();
  }, []);

  return (
    <div className=" container ">
      <Navbar />
      <div className=" card px-5 py-5 ">
        <h3>{product.title}</h3>
        <img src={product.image} height="250px" width="200px" />
        <p>Price : $ {product.price} </p>
        <p>description:{product.description}</p>
        <p>rate:{product.rating?.rate}</p>
      </div>
    </div>
  );
}
