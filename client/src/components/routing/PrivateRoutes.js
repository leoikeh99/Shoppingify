import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoutes = ({
  component: Component,
  auth: { loader2, token },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !token && !loader2 ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(PrivateRoutes);
