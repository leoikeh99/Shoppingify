import React from "react";

const Category = ({ category, history }) => {
  return (
    <div className="category">
      <h6>{category}</h6>
      <ul>
        {history.items.map(
          (item) =>
            item.category === category && (
              <li key={item._id}>
                <p>
                  {!item.cleared ? item.name : <strike>{item.name}</strike>}
                </p>
                <span>{item.quantity}pcs</span>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default Category;
