import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import style from "./favourite.module.css";

import Navbar from "../../component/Navbar.js/Navbar";

export default function Favourite() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("tokenId"));
    console.log(token, "token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  const favItem = useSelector((state) => state.reducerFav);
  const cartItem = useSelector((state) => state.reducerCart);
  const dispatch = useDispatch();
  console.log("cartItem", favItem);

  return (
    <>
      <div>
        <Navbar />
        {favItem.map((el) => (
          <div className={"container"}>
            <div className="card px-5 py-5  ">
              <img src={el.image} height="150px" width="200px" />
              <div className={style.content}>
                <div className={style.title}>{el.title}</div>
                <div className={style.description}>{el.description}</div>
                <div className={"mb-2"}>${el.price}</div>

                <button
                  onClick={() => dispatch({ type: "DELETE_FAV", payload: el })}
                  className={style.btn}
                >
                  Remove
                </button>
                {!cartItem.some((item) => item.id === el.id) ? (
                  <button
                    onClick={() => dispatch({ type: "ADD_CART", payload: el })}
                    className={style.btn}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button
                    className={style.btn}
                    onClick={() =>
                      dispatch({ type: "ITEM_REMOVE_CART", payload: el })
                    }
                  >
                    Remove from Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
