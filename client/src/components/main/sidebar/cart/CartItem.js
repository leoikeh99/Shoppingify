import React from "react";
import { connect } from "react-redux";
import {
  addToCart,
  removeFromCart,
  deleteFromCart,
  setCleared,
} from "../../../../actions/cartActions";
import PropTypes from "prop-types";

const CartItem = ({
  item,
  edit,
  addToCart,
  removeFromCart,
  deleteFromCart,
  setCleared,
}) => {
  const remove = () => {
    if (item.quantity !== 1) {
      removeFromCart(item);
    }
  };
  return (
    <li className="cartItem">
      <div className={!edit ? "spaceOut" : "grid"}>
        {!edit ? (
          <label>
            <input
              type="checkbox"
              className="filled-in"
              checked={item.cleared}
              onChange={() => setCleared(item.itemId)}
            />
            <span className="name">
              {item.cleared ? <strike>{item.name}</strike> : item.name}
            </span>
          </label>
        ) : (
          <label>
            <input
              onChange={() => setCleared(item.itemId)}
              type="checkbox"
              className="filled-in"
              checked={item.cleared}
            />
            <span className="name">
              {item.cleared ? <strike>{item.name}</strike> : item.name}
            </span>
          </label>
        )}
        {!edit ? (
          <span className="quantity">{item.quantity} pcs</span>
        ) : (
          <div className="edit">
            <div className="delete">
              <i
                className="material-icons"
                onClick={() => deleteFromCart(item.itemId)}
              >
                delete
              </i>
            </div>
            <i className="material-icons" onClick={remove}>
              remove
            </i>
            <span className="quantity">{item.quantity} pcs</span>
            <i className="material-icons" onClick={() => addToCart(item)}>
              add
            </i>
          </div>
        )}
      </div>
    </li>
  );
};

CartItem.propTypes = {
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  deleteFromCart: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  edit: PropTypes.bool,
};

export default connect(null, {
  addToCart,
  removeFromCart,
  deleteFromCart,
  setCleared,
})(CartItem);
