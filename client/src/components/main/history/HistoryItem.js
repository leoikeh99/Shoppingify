import React from "react";
import moment from "moment";

const HistoryItem = ({ item, setView }) => {
  return (
    <div className="historyItem" onClick={() => setView(item)}>
      <p>{item.name}</p>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span className="date">
          <i className="material-icons tiny">date_range</i>
          {moment(item.createdAt).format("LL")}
        </span>
        <span
          className={`status ${item.completed ? "blueStatus" : "redStatus"}`}
        >
          {item.completed ? "completed" : "cancelled"}
        </span>
        <i className="material-icons iconColor">chevron_right</i>
      </div>
    </div>
  );
};
export default HistoryItem;
