import React from "react";
import moment from "moment";
import Category from "./Category";
import { getCategories } from "../../../functions/componentFunctions";

const HistroyView = ({ history, setView, deleteHistory }) => {
  const Delete = () => {
    deleteHistory(history._id);
    setView(null);
  };
  return (
    <div>
      <div
        className="back"
        style={{ marginLeft: "0px" }}
        onClick={() => setView(null)}
      >
        <i className="material-icons tiny">arrow_back</i> back
      </div>
      <h5>{history.name}</h5>
      <span className="date" style={{ justifyContent: "flex-start" }}>
        <i className="material-icons tiny">date_range</i>
        {moment(history.createdAt).format("LL")}
      </span>
      <div style={{ marginTop: "40px" }}></div>
      {React.Children.toArray(
        getCategories(history.items).map((category) => (
          <Category category={category} history={history} />
        ))
      )}

      <button className="waves-effect waves-light btn red" onClick={Delete}>
        <i className="material-icons left">delete</i>
        Delete from history
      </button>

      <div className="mt-2"></div>
    </div>
  );
};

export default HistroyView;
