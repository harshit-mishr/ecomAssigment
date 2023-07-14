import React, { useState, useEffect } from "react";
import style from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navi = useNavigate();
  const [userDetails, setUserDetails] = useState({
    userName: "",
    email: "",
    dob: "",
    password: "",
    cPassword: "",
    tokenId: Math.random()
  });

  const [error, setError] = useState({
    userNameRegex: "",
    emailRegex: "",
    passwordRegex: "",
    cPasswordRegex: "",
    isUserRegister: ""
  });
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("allUserData"));
    setAllUserData(data);
  }, []);
  const [allUserData, setAllUserData] = useState([]);
  function handleSumbit() {
    let RegisteredUser = allUserData?.find(
      (data) => data.userName === userDetails.userName
    );
    if (RegisteredUser && RegisteredUser.password !== userDetails.password) {
      setError({ ...error, passwordRegex: "Wrong Password" });
    } else if (!RegisteredUser) {
      alert("You are not Register");
    } else {
      alert("Login Successfully");
      localStorage.setItem("tokenId", JSON.stringify(Math.random()));
      navi("/");
    }
  }

  return (
    <div className={style.mainBox}>
      <div></div>
      <div className={`${style.box} card `}>
        <p
          style={{
            color: "black",
            fontSize: "2rem"
          }}
        >
          Login...
        </p>
        <span>UserName</span>
        <input
          onChange={(e) => {
            setUserDetails({ ...userDetails, userName: e.target.value });
          }}
          className="form-control"
          type="text"
        />
        <span style={{ color: "red" }}>{error.userNameRegex}</span>

        <span>Password</span>
        <input
          onChange={(e) => {
            setUserDetails({ ...userDetails, password: e.target.value });
          }}
          className="form-control"
          type="password"
        />

        <div className={style.forgetSumbit}>
          <span>
            not register?&nbsp;
            <Link to="/register">register</Link>
          </span>
          <button onClick={handleSumbit} className="btn btn-dark">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
