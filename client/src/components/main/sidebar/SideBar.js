import React, { Fragment, useEffect, useState } from "react";
import bottle from "../../../images/bottle.svg";
import Cart from "./cart/Cart";
import SimpleBar from "simplebar-react";
import {
  saveCart,
  getCart,
  setToggle,
  finishCart,
} from "../../../actions/cartActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const SideBar = ({
  setAnim1,
  cart: { unsavedCart, toggle, savedCart },
  saveCart,
  getCart,
  setToggle,
  finishCart,
}) => {
  const [name, setName] = useState("");
  const save = () => {
    if (name.trim !== "") {
      saveCart({ ...unsavedCart, name });
    } else {
      saveCart(unsavedCart);
    }
  };

  const done = (completed) => {
    finishCart({ ...savedCart, completed });
  };

  useEffect(() => {
    if (unsavedCart) {
      setName(unsavedCart.name);
    }
  }, [unsavedCart]);

  useEffect(() => {
    getCart();
  }, []);
  return (
    <div className="sideBar" id="sideBar">
      <SimpleBar style={{ maxHeight: "100%" }}>
        <div className="container2">
          <div style={{ marginTop: "30px" }}></div>
          <div className="top">
            <div className="image">
              <img src={bottle} alt="" />
            </div>
            <div className="other">
              <p>Didn’t find what you need?</p>
              <button onClick={() => setAnim1(true)}>Add item</button>
            </div>
          </div>

          <div className="body">
            <div className="spaceOut" style={{ padding: "5px 0px" }}>
              <h5>{unsavedCart.name}</h5>
              {toggle.mode === "saved" && savedCart.items.length !== 0 ? (
                <i
                  className="material-icons"
                  onClick={() => setToggle({ mode: "unsaved", changes: false })}
                >
                  edit
                </i>
              ) : toggle.mode !== "saved" && unsavedCart.items.length !== 0 ? (
                toggle.changes ? (
                  <a className="modal-trigger" href="#options">
                    <i className="material-icons">close</i>
                  </a>
                ) : (
                  <i
                    className="material-icons"
                    onClick={() => setToggle({ mode: "saved", changes: false })}
                  >
                    close
                  </i>
                )
              ) : null}
            </div>
            <Cart />
          </div>
        </div>
      </SimpleBar>
      {toggle.mode !== "saved" && unsavedCart.items.length !== 0 ? (
        <div className="bottom">
          <div className="container2">
            <form action="" onSubmit={(e) => e.preventDefault()}>
              <div className="cover">
                <input
                  type="text"
                  placeholder="Enter a name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button onClick={save}>Save</button>
              </div>
            </form>
          </div>
        </div>
      ) : toggle.mode === "saved" && savedCart.items.length !== 0 ? (
        <div className="bottom">
          <div className="container2">
            <div className="center">
              <button className="cancel">
                <a className="modal-trigger" href="#cancel">
                  Cancel
                </a>
              </button>
              <button className="complete" onClick={() => done(true)}>
                Complete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

SideBar.propTypes = {
  setAnim1: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
  saveCart: PropTypes.func.isRequired,
  getCart: PropTypes.func.isRequired,
  setToggle: PropTypes.func.isRequired,
  finishCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ cart: state.cart });

export default connect(mapStateToProps, {
  saveCart,
  getCart,
  setToggle,
  finishCart,
})(SideBar);
