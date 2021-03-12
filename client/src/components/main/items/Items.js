import React, { Fragment, useEffect } from "react";
import Category from "./Category";
import Spinner from "../../layout/Spinner";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  getItems,
  filterItems,
  clearFilter,
  setCurrent,
} from "../../../actions/itemActions";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Items = ({
  getItems,
  items: { items, filtered, loader },
  filterItems,
  clearFilter,
  setCurrent,
}) => {
  useEffect(() => {
    getItems();
    clearFilter();
  }, []);

  const search = (e) => {
    if (e.target.value.trim() !== "") {
      filterItems(e.target.value.trim());
    } else {
      clearFilter();
    }
  };
  return (
    <div className="itemsView">
      {loader ? (
        <div className="center" style={{ height: "100vh", width: "100%" }}>
          <Spinner />
        </div>
      ) : (
        <Fragment>
          <div className="mt-2"></div>
          <div className="top">
            <h5>
              <span className="color">Shoppingify</span> allows you take your
              shopping list wherever you go
            </h5>

            <div className="input-field">
              <i className="material-icons prefix">search</i>
              <input type="text" id="search" name="search" onChange={search} />
              <label htmlFor="search">Search items</label>
            </div>
          </div>

          <div className="other">
            {!filtered ? (
              items.map((item) => (
                <Category
                  key={uuidv4()}
                  category={item}
                  setCurrent={setCurrent}
                />
              ))
            ) : (
              <Fragment>
                {filtered.length === 0 ? (
                  <div style={{ marginTop: "30px" }}>No matches</div>
                ) : (
                  filtered.map((item) => (
                    <Category
                      key={uuidv4()}
                      category={item}
                      setCurrent={setCurrent}
                    />
                  ))
                )}
              </Fragment>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

Items.propTypes = {
  getItems: PropTypes.func.isRequired,
  items: PropTypes.object,
  filtered: PropTypes.object,
  filterItems: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  loader: PropTypes.bool,
};

const mapStateToProps = (state) => ({ items: state.items });

export default connect(mapStateToProps, {
  getItems,
  filterItems,
  clearFilter,
  setCurrent,
})(Items);
