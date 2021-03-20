import React from "react";
import { finishCart } from "../../../../actions/cartActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const CancelCart = ({ finishCart, savedCart }) => {
  const done = (completed) => {
    finishCart({ ...savedCart, completed });
  };

  return (
    <div id="cancel" className="modal">
      <div className="modal-content">
        <h5
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <i
            className="material-icons yellow-text text-darken-3"
            style={{ marginRight: "8px" }}
          >
            warning
          </i>
          Cancel cart
        </h5>
        <p style={{ textAlign: "center" }}>
          Are you sure you want to cancel this cart?
        </p>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          className="modal-close waves-effect btn-flat"
          onClick={() => done(false)}
        >
          Yes
        </a>
        <a
          href="#!"
          className="modal-close waves-effect red waves-red btn-flat white-text lighten-1"
        >
          No
        </a>
      </div>
    </div>
  );
};

CancelCart.propTypes = {
  savedCart: PropTypes.object.isRequired,
  finishCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ savedCart: state.cart.savedCart });

export default connect(mapStateToProps, { finishCart })(CancelCart);
