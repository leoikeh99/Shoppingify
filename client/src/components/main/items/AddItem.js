import React, { useEffect, useState } from "react";
import { addItem } from "../../../actions/itemActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AddItem = ({ anim1, setAnim1, addItem }) => {
  const [item, setItem] = useState({
    name: "",
    note: "",
    category: "",
    image: "",
  });
  useEffect(() => {
    setItem({
      name: "",
      note: "",
      category: "",
      image: "",
    });
    const addItem = document.querySelector(".addItem");
    if (anim1) {
      addItem.style.animation = "slideIn 0.1s ease-in forwards";
    } else {
      addItem.style.animation = "slideOut 0.1s ease-in forwards";
    }
  }, [anim1]);

  const onChange = (e) => setItem({ ...item, [e.target.name]: e.target.value });

  const save = () => {
    if (item.name.trim() !== "" && item.category.trim() !== "") {
      const saveItem = {
        name: item.name,
        category: item.category,
        note: item.note.trim() === "" ? null : item.note,
        image: item.image.trim() === "" ? null : item.image,
      };

      addItem(saveItem);
    }
  };

  return (
    <div className="addItem">
      <h5>Add a new item</h5>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <div className="row">
          <div className="input-field ">
            <input
              type="text"
              name="name"
              id="name"
              required
              onChange={onChange}
              value={item.name}
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-field">
            <input
              type="text"
              name="note"
              id="note"
              onChange={onChange}
              value={item.note}
            />
            <label htmlFor="note">Note (optional)</label>
          </div>
          <div className="input-field ">
            <input
              type="text"
              name="image"
              id="image"
              onChange={onChange}
              value={item.image}
            />
            <label htmlFor="image">Image url (optional)</label>
          </div>
          <div className="input-field ">
            <input
              type="text"
              name="category"
              id="category"
              required
              onChange={onChange}
              value={item.category}
            />
            <label htmlFor="category">Category</label>
          </div>
        </div>
        <div className="buttons">
          <button onClick={() => setAnim1(false)}>cancel</button>
          <button onClick={save}>Save</button>
        </div>
      </form>
    </div>
  );
};

AddItem.propTypes = {
  anim1: PropTypes.bool.isRequired,
  setAnim1: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
};

export default connect(null, { addItem })(AddItem);
