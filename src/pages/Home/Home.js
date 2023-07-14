import React, { useState, useEffect } from "react";
import style from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../component/Navbar.js/Navbar";
export default function Home() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.reducerCart);
  const favItem = useSelector((state) => state.reducerFav);
  const navigate = useNavigate();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("tokenId"));
    console.log(token, "token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      let url = "https://fakestoreapi.com/products";
      if (filter && filter !== "Category") {
        url += `/category/${filter}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setData(data.map((item) => ({ ...item, qty: 1, isAdd: false })));
    };
    fetchData();
    const fetchCategories = async () => {
      const responce = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const data = await responce.json();
      setCategory(data);
    };
    fetchCategories();
  }, [filter]);

  console.log(data);
  const handleIncrease = (item) => {
    setData((prevData) =>
      prevData.map((el) =>
        el.id === item.id ? { ...el, qty: el.qty + 1 } : el
      )
    );
  };

  const handleDecrease = (item) => {
    setData((prevData) =>
      prevData.map((el) =>
        el.id === item.id
          ? { ...el, qty: el.qty > 0 ? el.qty - 1 : 0, isAdd: el.qty > 1 }
          : el
      )
    );
  };

  const handleAdd = (item) => {
    setData((prevData) =>
      prevData.map((el) => (el.id === item.id ? { ...el, isAdd: true } : el))
    );
  };

  const [search, setSearch] = useState("");

  return (
    <div>
      <Navbar setSearch={setSearch} search={search} />
      <div className="  container ">
        <div>
          <select
            style={{ width: "20rem" }}
            className="form-control"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="Category">Category</option>
            {category.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>
        <div className="row d-flex flex-row">
          {data
            .filter((e) => e.title.toUpperCase().includes(search.toUpperCase()))
            .map((e) => (
              <div
                key={e.id}
                onClick={() => navigate(`/product/:${e.id}`)}
                className="col-3  card m-3 p-3"
              >
                <img width="100px" height="100px" src={e.image} />
                <div>
                  <p
                    className="d-inline-block text-truncate"
                    style={{ maxWidth: "150px" }}
                  >
                    {e.title}
                  </p>
                  <p>$&nbsp;{e.price}</p>
                  <p>⭐&nbsp;{e.rating.rate}</p>
                </div>
                <div className="d-flex flex-row">
                  {!cartItem.find((i) => i.id === e.id)?.qty ? (
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        dispatch({ type: "ADD_CART", payload: e });
                        handleAdd(e);
                      }}
                      className="btn btn-outline-dark mx-2"
                    >
                      Add to cart
                    </button>
                  ) : (
                    <div className="d-flex flex-row">
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          dispatch({ type: "DELETE_CART", payload: e });
                          handleDecrease(e);
                        }}
                        className="btn btn-outline-success"
                      >
                        ➖
                      </button>
                      <p className='class="badge badge-light"'>
                        {cartItem.find((i) => i.id == e.id).qty}
                      </p>
                      <button
                        className="btn btn-outline-success"
                        onClick={(event) => {
                          event.stopPropagation();
                          dispatch({ type: "ADD_CART", payload: e });
                          handleIncrease(e);
                        }}
                      >
                        ➕
                      </button>
                    </div>
                  )}
                  {favItem.find((i) => i.id === e.id) ? (
                    <button
                      className="btn btn-outline-danger mx-2"
                      onClick={(event) => {
                        event.stopPropagation();
                        dispatch({ type: "DELETE_FAV", payload: e });
                      }}
                    >
                      Remove Fav
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger mx-2"
                      onClick={(event) => {
                        event.stopPropagation();
                        dispatch({ type: "ADD_FAV", payload: e });
                      }}
                    >
                      🤍
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
