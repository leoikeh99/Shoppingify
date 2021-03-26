import React, { useEffect } from "react";

const ProgressBar = ({ value, id, title, total, background }) => {
  useEffect(() => {
    const progress = document.getElementById(id);
    progress.style.width = `${Math.floor((value / total) * 100)}%`;
    progress.style.background = background ? background : "#56ccf2";
  });
  return (
    <div className="progressBar">
      <div className="spaceOut">
        <p>{title}</p>
        <p>{Math.floor((value / total) * 100)}%</p>
      </div>
      <div className="cover">
        <div className="progress1" id={id}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
