import React, { Fragment, useEffect } from "react";
import SimpleBar from "simplebar-react";
import { deleteItem } from "../../../actions/itemActions";
import { addToCart } from "../../../actions/cartActions";
import ButtonSpinner from "../../layout/ButtonSpinner";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const ViewItem = ({ items: { current, loader2 }, deleteItem, addToCart }) => {
  useEffect(() => {
    const viewItem = document.querySelector(".viewItem");
    if (current && current.type === "view") {
      viewItem.style.animation = "slideIn 0.1s ease-in forwards";
    } else {
      viewItem.style.right = "-380px";
      viewItem.style.animation = "none";
    }
    //eslint-disable-next-line
  }, [current]);

  const add = () => {
    addToCart({ ...current.data, itemId: current.data._id, quantity: 1 });
    const viewItem = document.querySelector(".viewItem");
    viewItem.style.animation = "slideOut 0.1s ease-in forwards";
    const sideBar = document.querySelector(".sideBar");

    if (sideBar.classList.contains("slideOut")) {
      sideBar.classList.remove("slideOut");
      sideBar.classList.add("slideIn");
    }
  };

  const back = () => {
    const viewItem = document.querySelector(".viewItem");
    viewItem.style.animation = "slideOut 0.1s ease-in forwards";
  };

  return (
    <div className="viewItem" id="viewItem">
      <SimpleBar style={{ height: "100%" }}>
        <div className="mt-2"></div>
        <span className="back" onClick={back}>
          <i className="material-icons">arrow_back</i>back
        </span>
        <div className="container">
          {loader2 && loader2 === "delete" && (
            <div className="loader">
              <ButtonSpinner />
            </div>
          )}
          {current && current.type === "view" && (
            <Fragment>
              <div className="mt-2"></div>
              {current.data.image && current.data.image.trim() !== "" && (
                <div
                  className="image"
                  style={{ backgroundImage: `url(${current.data.image})` }}
                />
              )}
              <small>Name</small>
              <p style={{ fontSize: "1.3rem" }}>{current.data.name}</p>
              <small>Category</small>
              <p>{current.data.category}</p>
              {current.data.note && (
                <Fragment>
                  <small>Note</small>
                  <p>{current.data.note}</p>
                </Fragment>
              )}
            </Fragment>
          )}
        </div>
      </SimpleBar>
      <div className="buttons">
        <button onClick={() => deleteItem(current.data._id)}>Delete</button>
        <button onClick={add}>Add to list</button>
      </div>
    </div>
  );
};

ViewItem.propTypes = {
  current: PropTypes.object,
};

const mapStateToProps = (state) => ({ items: state.items });

export default connect(mapStateToProps, { deleteItem, addToCart })(ViewItem);
