import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import style from "./cart.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Navbar from "../../component/Navbar.js/Navbar";

export default function Cart() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("tokenId"));
    console.log(token, "token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  const cartItem = useSelector((state) => state.reducerCart);
  const [item, setItem] = useState([]);

  useEffect(() => {
    setItem(cartItem);
  }, [cartItem]);

  const dispatch = useDispatch();
  console.log("cartItem", cartItem);
  return (
    <>
      <div>
        <Navbar />
        <Table border="1px solid">
          <th>Image</th>
          <th>Name</th>
          <th>Price/Qty</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Action</th>
          {item.map((el) => {
            return (
              <tr>
                <td>
                  <img width="50px" src={el.image} />
                </td>
                <td>{el.title}</td>
                <td>{el.price}</td>
                <td>
                  <div className=" d-flex  ">
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        dispatch({ type: "DELETE_CART", payload: el });
                        // handleDecrease(e);
                      }}
                    >
                      {"➖"}
                    </button>
                    <p>{el.qty}</p>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        dispatch({ type: "ADD_CART", payload: el });
                        // handleIncrease(e);
                      }}
                    >
                      {"➕"}
                    </button>
                  </div>
                </td>
                <td>
                  {" "}
                  <b> {(+el.price * +el.qty).toFixed(2)}</b>
                </td>
                <td
                  onClick={() =>
                    dispatch({ type: "ITEM_REMOVE_CART", payload: el })
                  }
                >
                  {"⛔"}
                </td>
              </tr>
            );
          })}
        </Table>
        <p>
          TOTAL AMOUNT :{" "}
          {item.reduce((total, el) => total + el.price * el.qty, 0).toFixed(2)}
        </p>
      </div>
    </>
  );
}
