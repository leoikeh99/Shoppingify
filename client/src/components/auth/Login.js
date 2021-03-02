import React, { useEffect, useState } from "react";
import logo from "../../images/logo.svg";
import { connect } from "react-redux";
import { auth, clearError } from "../../actions/authActions";
import { Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";
import PropTypes from "prop-types";
const validator = require("email-validator");

const Login = ({ auth, token, loader, history, error, clearError }) => {
  const [validate, setValidate] = useState(null);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setValidate(null);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    //validation

    if (validator.validate(data.email)) {
      if (data.password.length >= 6) {
        auth("login", data);
      } else {
        setValidate({ type: 2, msg: "Min length: 6" });
      }
    } else {
      setValidate({ type: 1, msg: "Invalid email" });
    }
  };

  useEffect(() => {
    if (token) {
      history.push("/");
    }
    //eslint-disable-next-line
  }, [token, history]);

  useEffect(() => {
    if (error) {
      M.toast({ html: error });
      document
        .querySelectorAll(".toast")
        .forEach((toast) => (toast.style.background = "#f44336"));
      clearError();
    }
    //eslint-disable-next-line
  }, [error]);

  return (
    <div className="auth">
      <h5
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={logo} alt="" style={{ width: "40px" }} />{" "}
        <span className="mr-1"></span> Shoppingify
      </h5>
      <form action="" onSubmit={submit}>
        <div className="row">
          <div className="input-field ">
            <i className="small material-icons prefix">mail</i>
            <input
              id="email"
              type="email"
              className="validate"
              name="email"
              onChange={onChange}
              value={data.email}
            />
            <label htmlFor="email">Email</label>
            {validate && validate.type === 1 && (
              <span className="helper-text  red-text darken-1">
                {validate.msg}
              </span>
            )}
          </div>
        </div>

        <div className="row">
          <div className="input-field ">
            <i className="small material-icons prefix">lock</i>
            <input
              id="password"
              type="password"
              className="validate"
              name="password"
              onChange={onChange}
              value={data.password}
              minLength={6}
            />
            <label htmlFor="password">Password</label>
            {validate && validate.type === 2 && (
              <span className="helper-text  red-text darken-1">
                {validate.msg}
              </span>
            )}
          </div>
        </div>

        <button
          className={`waves-effect waves-light btn ${loader ? "disabled" : ""}`}
          style={fullwidth}
        >
          {loader ? (
            <div className="center">
              <div
                className="preloader-wrapper big active"
                style={{ width: "30px", height: "30px" }}
              >
                <div className="spinner-layer">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div>
                  <div className="gap-patch">
                    <div className="circle"></div>
                  </div>
                  <div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            "Login"
          )}
        </button>
        <div className="mt-1"></div>
        <span>
          Don't have an account? <Link to="/register">SignUp</Link>
        </span>
      </form>
    </div>
  );
};
const fullwidth = {
  width: "100%",
};

Login.propTypes = {
  token: PropTypes.string,
  loader: PropTypes.bool.isRequired,
  error: PropTypes.string,
  auth: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  loader: state.auth.loader,
  error: state.auth.error,
});

export default connect(mapStateToProps, { auth, clearError })(Login);
