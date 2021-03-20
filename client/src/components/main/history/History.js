import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getHistory } from "../../../actions/cartActions";

const History = ({ getHistory }) => {
  useEffect(() => {
    getHistory();
  });
  return <div>History</div>;
};

export default connect(null, { getHistory })(History);
