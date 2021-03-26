import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import HistoryItem from "./HistoryItem";
import HistoryView from "./HistoryView";
import { deleteHistory } from "../../../actions/cartActions";
import moment from "moment";
import { getTopDate } from "../../../functions/componentFunctions";

const History = ({ cart: { history }, deleteHistory }) => {
  const [view, setView] = useState(null);

  return (
    <div className="history">
      <div style={{ marginTop: "35px" }}></div>
      {!view ? (
        <Fragment>
          <h5>Shopping history</h5>
          {history.length === 0 && <p>Finish a cart to view history</p>}
          {history.map((item) => (
            <Fragment key={item._id}>
              {!item.deleted && (
                <Fragment>
                  {getTopDate(history, item) && (
                    <div className="topDate">
                      {moment(item.createdAt).format("LL")}
                    </div>
                  )}
                  <HistoryItem item={item} setView={setView} />
                </Fragment>
              )}
            </Fragment>
          ))}
        </Fragment>
      ) : (
        <HistoryView
          history={view}
          setView={setView}
          deleteHistory={deleteHistory}
        />
      )}
    </div>
  );
};

History.propTypes = {
  cart: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ cart: state.cart });

export default connect(mapStateToProps, { deleteHistory })(History);
