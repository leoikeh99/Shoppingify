import React, { Fragment } from "react";
import { addToCart } from "../../../actions/cartActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Category = ({ category, setCurrent, addToCart, setAnim1 }) => {
  const add = (data, category) => {
    addToCart({
      name: data.name,
      quantity: 1,
      cleared: false,
      itemId: data._id,
      category,
    });
  };
  return (
    <div className="category">
      <h6>{category.name}</h6>
      {category.items.length !== 0 ? (
        <ul>
          {category.items.map((item) => (
            <li key={item._id}>
              <span onClick={() => setCurrent(item, "view")}>{item.name}</span>
              <Fragment>
                <i
                  className="material-icons edit"
                  onClick={() => setCurrent(item, "edit")}
                >
                  edit
                </i>
                <i
                  className="material-icons"
                  onClick={() => add(item, category.name)}
                >
                  add
                </i>
              </Fragment>
            </li>
          ))}
        </ul>
      ) : (
        <button className="spaceOut" onClick={() => setAnim1(category.name)}>
          Add an item <i className="material-icons"> add </i>
        </button>
      )}
    </div>
  );
};

Category.propTypes = {
  cart: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ cart: state.cart });

export default connect(mapStateToProps, { addToCart })(Category);
