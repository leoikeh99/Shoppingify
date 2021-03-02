import React, { Fragment, useEffect } from "react";
import Category from "./Category";
import Spinner from "../../layout/Spinner";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  getItems,
  filterItems,
  clearFilter,
} from "../../../actions/itemActions";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Items = ({
  getItems,
  items: { items, filtered, loader },
  filterItems,
  clearFilter,
}) => {
  useEffect(() => {
    getItems();
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
            <TransitionGroup>
              {!filtered
                ? items.map((item) => (
                    <CSSTransition
                      key={uuidv4()}
                      timeout={500}
                      classNames="item"
                    >
                      <Category key={uuidv4()} category={item} />
                    </CSSTransition>
                  ))
                : filtered.map((item) => (
                    <CSSTransition
                      key={uuidv4()}
                      timeout={500}
                      classNames="item"
                    >
                      <Category key={uuidv4()} category={item} />
                    </CSSTransition>
                  ))}
            </TransitionGroup>
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
  loader: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({ items: state.items });

export default connect(mapStateToProps, { getItems, filterItems, clearFilter })(
  Items
);
