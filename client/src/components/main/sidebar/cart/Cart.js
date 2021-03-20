import React, { Fragment } from "react";
import CartItem from "./CartItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Cart = ({ cart: { unsavedCart, savedCart, toggle }, items }) => {
  return (
    <div className="cart">
      {toggle.mode === "saved" ? (
        <Fragment>
          {React.Children.toArray(
            items.map((item) => (
              <ul key={item._id}>
                {savedCart.items.some((val) => val.category === item.name) ? (
                  <li className="category">
                    <ul>
                      <p>{item.name}</p>

                      {savedCart.items.map((val) =>
                        val.category === item.name ? (
                          <CartItem key={val.itemId} item={val} />
                        ) : null
                      )}
                    </ul>
                  </li>
                ) : null}
              </ul>
            ))
          )}
        </Fragment>
      ) : (
        <Fragment>
          {React.Children.toArray(
            items.map((item) => (
              <ul>
                {unsavedCart.items.some((val) => val.category === item.name) ? (
                  <li className="category">
                    <ul>
                      <p>{item.name}</p>
                      <TransitionGroup>
                        {React.Children.toArray(
                          unsavedCart.items.map((val) =>
                            val.category === item.name ? (
                              <CSSTransition
                                key={item._id}
                                timeout={500}
                                classNames="item"
                              >
                                <CartItem
                                  key={val.itemId}
                                  item={val}
                                  edit={true}
                                />
                              </CSSTransition>
                            ) : null
                          )
                        )}
                      </TransitionGroup>
                    </ul>
                  </li>
                ) : null}
              </ul>
            ))
          )}
        </Fragment>
      )}
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  items: state.items.items,
});

export default connect(mapStateToProps)(Cart);
