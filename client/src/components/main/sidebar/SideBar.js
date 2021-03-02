import React from "react";
import bottle from "../../../images/bottle.svg";
import PropTypes from "prop-types";

const SideBar = ({ setAnim1 }) => {
  return (
    <div className="sideBar">
      <div className="top">
        <div className="image">
          <img src={bottle} alt="" />
        </div>
        <div className="other">
          <p>Didn’t find what you need?</p>
          <button onClick={() => setAnim1(true)}>Add item</button>
        </div>
      </div>
    </div>
  );
};

SideBar.propTypes = {
  setAnim1: PropTypes.func.isRequired,
};
export default SideBar;
