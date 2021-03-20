import React from "react";

const ButtonSpinner = () => {
  return (
    <div
      className="preloader-wrapper big active"
      style={{ width: "30px", height: "30px" }}
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
