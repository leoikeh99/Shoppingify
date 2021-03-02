import React, { useEffect, useState } from "react";
import { addItem } from "../../../actions/itemActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SimpleBar from "simplebar-react";

const AddItem = ({ anim1, setAnim1, addItem, items }) => {
  const [suggestions, setSuggestions] = useState([]);
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

  const onChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });

    const category = document.getElementById("category").value;
    if (category.trim() !== "") {
      const result = items
        .filter((val) =>
          val.name.toLowerCase().includes(category.toLowerCase())
        )
        .map((val) => val.name);
      setSuggestions(result);
    } else {
      setSuggestions([]);
    }
  };

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

  useEffect(() => {}, [item, items]);

  const select = (suggestion) => {
    setItem({ ...item, category: suggestion });
    setSuggestions([]);
  };

  return (
    <div className="addItem">
      <SimpleBar style={{ maxHeight: "100%" }}>
        <div className="container">
          <div style={{ marginTop: "35px" }}></div>
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
              <div className="category">
                <div className="input-field" style={{ marginBottom: "0px" }}>
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

                {suggestions.length !== 0 && (
                  <ul className="suggestions">
                    <SimpleBar style={{ maxHeight: "130px" }}>
                      {suggestions.map((suggestion) => (
                        <li onClick={() => select(suggestion)}>{suggestion}</li>
                      ))}
                    </SimpleBar>
                  </ul>
                )}
              </div>
            </div>
            <div className="buttons">
              <button onClick={() => setAnim1(false)}>cancel</button>
              <button onClick={save}>Save</button>
            </div>
          </form>

          <div style={{ marginTop: "20px" }}></div>
        </div>
      </SimpleBar>
    </div>
  );
};

AddItem.propTypes = {
  anim1: PropTypes.bool.isRequired,
  setAnim1: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.items.items,
});

export default connect(mapStateToProps, { addItem })(AddItem);
