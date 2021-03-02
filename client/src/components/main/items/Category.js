import React from "react";

const Category = ({ category }) => {
  return (
    <div className="category">
      <h6>{category.name}</h6>
      <ul>
        {category.items.map((item) => (
          <li key={item._id}>
            <span>{item.name}</span>
            <i className="material-icons">add</i>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
