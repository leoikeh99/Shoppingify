import React, { useEffect, useState } from "react";
import logo from "../../images/logo.svg";
import { connect } from "react-redux";
import { auth, clearError } from "../../actions/authActions";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import M from "materialize-css/dist/js/materialize.min.js";
const validator = require("email-validator");

const Register = ({ auth, token, loader, history, error, clearError }) => {
  const [validate, setValidate] = useState(null);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const onChange = (e) => {
    setValidate(null);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    //validation
    if (data.username.trim() !== "") {
      if (validator.validate(data.email)) {
        if (data.password.length >= 6) {
          if (data.password === data.cpassword) {
            setValidate(null);
            auth("register", {
              username: data.username,
              email: data.email,
              password: data.password,
            });
          } else {
            setValidate({ type: 4, msg: "Passwords do not match" });
          }
        } else {
          setValidate({ type: 3, msg: "Min length: 6" });
        }
      } else {
        setValidate({ type: 2, msg: "Invalid email" });
      }
    } else {
      setValidate({ type: 1, msg: "Username is required" });
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
            <i className="small material-icons prefix">account_circle</i>
            <input
              type="text"
              id="username"
              name="username"
              className="validate"
              onChange={onChange}
              value={data.username}
              maxLength={20}
            />
            <label htmlFor="username">Username</label>
            {validate && validate.type === 1 && (
              <span class="helper-text  red-text darken-1">{validate.msg}</span>
            )}
          </div>
        </div>

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
            {validate && validate.type === 2 && (
              <span class="helper-text  red-text darken-1">{validate.msg}</span>
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
            {validate && validate.type === 3 && (
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
              id="cpassword"
              type="password"
              className="validate"
              name="cpassword"
              onChange={onChange}
              value={data.cpassword}
              minLength={6}
            />
            <label htmlFor="cpassword">Confirm Password</label>
            {validate && validate.type === 4 && (
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
            "Sign Up"
          )}
        </button>
        <div className="mt-1"></div>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

const fullwidth = {
  width: "100%",
};

Register.propTypes = {
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

export default connect(mapStateToProps, { auth, clearError })(Register);
