import React, { Fragment } from "react";

const Category = ({ category, setCurrent }) => {
  return (
    <div className="category">
      <h6>{category.name}</h6>
      <ul>
        {category.items.map((item) => (
          <li key={item._id}>
            <span onClick={() => setCurrent(item, "view")}>{item.name}</span>
            <Fragment>
              <i className="material-icons edit">edit</i>
              <i className="material-icons">add</i>
            </Fragment>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
