import React from "react";

const ButtonSpinner = ({ small }) => {
  return (
    <div
      className="preloader-wrapper big active"
      style={{
        width: small ? "21px" : "30px",
        height: small ? "21px" : "30px",
      }}
    >
      <div className="spinner-layer">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div>
        <div className="gap-patch">
          <div className="circle"></div>
        </div>
        <div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    </div>
  );
};

export default ButtonSpinner;
