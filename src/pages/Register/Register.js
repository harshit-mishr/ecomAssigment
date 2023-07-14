import React, { useState } from "react";
import style from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
export default function Register() {
  const navi = useNavigate();
  const [userDetails, setUserDetails] = useState({
    userName: "",
    email: "",
    dob: "",
    password: "",
    cPassword: ""
  });

  const [error, setError] = useState({
    userNameRegex: "",
    emailRegex: "",
    passwordRegex: "",
    cPasswordRegex: "",
    isUserRegister: ""
  });

  const [allUserData, setAllUserData] = useState([]);
  function handleSumbit() {
    const EmailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]{4,}@[a-zA-Z]+\.[a-zA-Z]+/;
    const UserNameRegex = /^[^\s]+$/;
    const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;

    if (!EmailRegex.test(userDetails.email)) {
      setError({ ...error, emailRegex: "invaild Email..." });
    } else if (!UserNameRegex.test(userDetails.userName)) {
      setError({ ...error, userNameRegex: "invaild username..." });
    } else if (!PasswordRegex.test(userDetails.password)) {
      setError({ ...error, passwordRegex: "invaild username..." });
    } else if (userDetails.password !== userDetails.cPassword) {
      setError({ ...error, cPasswordRegex: "Password did not match" });
    } else {
      allUserData.push(userDetails);
      localStorage.setItem("allUserData", JSON.stringify(allUserData));

      setAllUserData(allUserData);
      alert("Sign Up Successfully");
      navi("/login");
    }
  }
  console.log(error);
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
          Register...
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
        <span>Email</span>
        <input
          onChange={(e) => {
            setUserDetails({ ...userDetails, email: e.target.value });
          }}
          className="form-control"
        />
        <span>{error.emailRegex}</span>
        <span>Dob</span>
        <input
          onChange={(e) => {
            setUserDetails({ ...userDetails, dob: e.target.value });
          }}
          className="form-control"
          type="date"
        />
        <span>Password</span>
        <input
          onChange={(e) => {
            setUserDetails({ ...userDetails, password: e.target.value });
          }}
          className="form-control"
          type="password"
        />
        <span>Confirm Password</span>
        <input
          onChange={(e) => {
            setUserDetails({ ...userDetails, cPassword: e.target.value });
          }}
          type="password"
          className="form-control"
        />
        <div className={style.forgetSumbit}>
          <span>
            allredy register?&nbsp; <Link to="/login">Login</Link>
          </span>
          <button onClick={handleSumbit} className="btn btn-dark">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
