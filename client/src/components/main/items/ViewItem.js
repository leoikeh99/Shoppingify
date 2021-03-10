import React, { Fragment, useEffect } from "react";
import SimpleBar from "simplebar-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const ViewItem = ({ current }) => {
  useEffect(() => {
    const viewItem = document.querySelector(".viewItem");
    if (current && current.type === "view") {
      viewItem.style.animation = "slideIn 0.1s ease-in forwards";
    }
  }, [current]);

  const back = () => {
    const viewItem = document.querySelector(".viewItem");
    viewItem.style.animation = "slideOut 0.1s ease-in forwards";
  };

  return (
    <div className="viewItem">
      <SimpleBar style={{ maxHeight: "100%" }}>
        <div className="mt-2"></div>
        <span className="back" onClick={back}>
          <i className="material-icons">arrow_back</i>back
        </span>
        <div className="container">
          {current && current.type === "view" && (
            <Fragment>
              <div className="mt-2"></div>
              <div
                className="image"
                style={{
                  backgroundImage: `url(
              "https://sweetpeasandsaffron.com/wp-content/uploads/2019/02/how-to-cut-an-avocado-3.jpg"
            )`,
                }}
              ></div>
              <small>name</small>
              <p style={{ fontSize: "1.3rem" }}>{current.data.name}</p>
              <small>category</small>
              <p>{current.data.category}</p>
              {current.data.note && (
                <Fragment>
                  <small>note</small>
                  <p>{current.data.note}</p>
                </Fragment>
              )}
              <div className="buttons">
                <button>delete</button>
                <button>add to list</button>
              </div>
            </Fragment>
          )}
        </div>
      </SimpleBar>
    </div>
  );
};

const mapStateToProps = (state) => ({ current: state.items.current });

export default connect(mapStateToProps)(ViewItem);
