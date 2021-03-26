import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getStats } from "../../../functions/componentFunctions";
import ProgressStats from "./ProgressStats";
import MonthlySummary from "./MonthlySummary";
import MonthsSummary from "./MonthsSummary";
import M from "materialize-css/dist/js/materialize.min.js";

export const Stats = ({ cart: { history } }) => {
  useEffect(() => {
    var el = document.querySelector(".tabs");
    M.Tabs.init(el, {});
  }, []);
  return (
    <div className="stats">
      <br />
      <div className="top">
        <ProgressStats
          data={getStats(history).rankItems}
          title={"Top items"}
          total={history.length}
          background={"#f9a109"}
        />

        <ProgressStats
          data={getStats(history).rankCategories.map((val) => {
            const obj = { ...val, name: val.category };
            return obj;
          })}
          title={"Top Categories"}
          total={getStats(history).total}
        />
      </div>
      <br />
      <br />
      <div className="row" id="tabs">
        <div className="col s12">
          <ul className="tabs" style={{ background: "#f4f4fd" }}>
            <li className="tab col s6">
              <a style={{ color: "#000" }} href="#ms">
                This Month
              </a>
            </li>
            <li className="tab col s6">
              <a style={{ color: "#000" }} href="#sm">
                Monthly Summary
              </a>
            </li>
          </ul>
        </div>
      </div>
      <MonthsSummary data={getStats(history).summary_m} />
      <MonthlySummary data={getStats(history).summary_y} />
    </div>
  );
};

Stats.propTypes = {
  cart: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ cart: state.cart });

export default connect(mapStateToProps)(Stats);
