import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-5 ">
      <a class="navbar-brand" href="#">
        Navbar
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
        <ul class="navbar-nav px-5  ">
          <li class="nav-item active px-3">
            <Link class="nav-link" to="/">
              Home{" "}
            </Link>
          </li>
          <li class="nav-item active  px-3">
            <Link class="nav-link" to="/cart">
              Cart{" "}
            </Link>
          </li>
          <li class="nav-item active  px-3">
            <Link class="nav-link" to="/favourite">
              Favourite{" "}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
