import React from "react";
import { connect } from "react-redux";
import { setToggle } from "../../../../actions/cartActions";
import PropTypes from "prop-types";

const CartOptions = ({ setToggle }) => {
  return (
    <div id="options" className="modal">
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
          Exit edit mode
        </h5>
        <p style={{ textAlign: "center" }}>
          Are you sure you want to clear unsaved changes?
        </p>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          className="modal-close waves-effect btn-flat"
          onClick={() => setToggle({ mode: "saved", changes: false })}
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

CartOptions.propTypes = {
  setToggle: PropTypes.func.isRequired,
};

export default connect(null, { setToggle })(CartOptions);
