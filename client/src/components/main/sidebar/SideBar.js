import React, { Fragment, useEffect, useState } from "react";
import bottle from "../../../images/bottle.svg";
import Cart from "./cart/Cart";
import SimpleBar from "simplebar-react";
import Spinner from "../../layout/Spinner";
import ButtonSpinner from "../../layout/ButtonSpinner";
import image from "../../../images/shopping.svg";
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
  cart: { unsavedCart, toggle, savedCart, loader, loader3 },
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
    //eslint-disable-next-line
  }, [unsavedCart]);

  useEffect(() => {
    getCart();
    //eslint-disable-next-line
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
              {toggle.mode === "saved" && savedCart.items.length !== 0 ? (
                <h5>{savedCart.name}</h5>
              ) : toggle.mode !== "saved" && unsavedCart.items.length !== 0 ? (
                <h5>{unsavedCart.name}</h5>
              ) : null}
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

            {toggle.mode === "saved" &&
            savedCart.items.length === 0 &&
            !loader ? (
              <div className="noItems">
                <p>No items</p>
                <img src={image} alt="" />
              </div>
            ) : (
              <Fragment>
                {loader ? (
                  <div className="center mt-2">
                    <Spinner />
                  </div>
                ) : (
                  <Cart />
                )}
              </Fragment>
            )}
          </div>
        </div>
      </SimpleBar>
      {toggle.mode !== "saved" && unsavedCart.items.length !== 0 ? (
        <div className="bottom">
          <div className="container2">
            {loader3 && (
              <div className="loader">
                <ButtonSpinner small={true} />{" "}
              </div>
            )}
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
            {loader3 && (
              <div className="loader">
                <ButtonSpinner />
              </div>
            )}
            <div className="center">
              <button className="cancel" disabled={loader3}>
                <a
                  className="modal-trigger"
                  href={`${!loader3 ? "#cancel" : "#!"}`}
                >
                  Cancel
                </a>
              </button>
              <button
                className="complete"
                onClick={() => done(true)}
                disabled={loader3}
              >
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
