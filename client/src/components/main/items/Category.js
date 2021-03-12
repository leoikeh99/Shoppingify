import React, { Fragment } from "react";

const Category = ({ category, setCurrent }) => {
  return (
    <div className="category">
      <h6>{category.name}</h6>
      {category.items.length !== 0 ? (
        <ul>
          {category.items.map((item) => (
            <li key={item._id}>
              <span onClick={() => setCurrent(item, "view")}>{item.name}</span>
              <Fragment>
                <i
                  className="material-icons edit"
                  onClick={() => setCurrent(item, "edit")}
                >
                  edit
                </i>
                <i className="material-icons">add</i>
              </Fragment>
            </li>
          ))}
        </ul>
      ) : (
        <button>Add an item</button>
      )}
    </div>
  );
};

export default Category;
