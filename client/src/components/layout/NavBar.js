import React from "react";
import PropTypes from "prop-types";
import logo from "../../images/logo.svg";

const NavBar = ({ nav, setNav }) => {
  return (
    <div className="nav">
      <div className="topImg">
        <img src={logo} alt="" />
      </div>
      <ul>
        <li onClick={() => setNav("items")}>
          <span className={`tab ${nav === "items" ? "show" : ""}`}></span>
          <i className="small material-icons">format_list_bulleted</i>
        </li>
        <li onClick={() => setNav("history")}>
          <span className={`tab ${nav === "history" ? "show" : ""}`}></span>
          <i className="small material-icons">replay</i>
        </li>
        <li onClick={() => setNav("stats")}>
          <span className={`tab ${nav === "stats" ? "show" : ""}`}></span>
          <i className="small material-icons">insert_chart</i>
        </li>
      </ul>
      <div className="cart">
        <i className="tiny material-icons">shopping_cart</i>
      </div>
    </div>
  );
};

NavBar.propTypes = {
  nav: PropTypes.string.isRequired,
  setNav: PropTypes.func.isRequired,
};

export default NavBar;
