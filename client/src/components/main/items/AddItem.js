import React, { useEffect, useState } from "react";
import { addItem } from "../../../actions/itemActions";
import { connect } from "react-redux";
import ButtonSpinner from "../../layout/ButtonSpinner";
import PropTypes from "prop-types";
import SimpleBar from "simplebar-react";

const AddItem = ({ anim1, setAnim1, addItem, items: { items, loader2 } }) => {
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
      console.log(typeof anim1);
      if (typeof anim1 === "string") {
        setItem({ ...item, category: anim1 });
      }
    }
    //eslint-disable-next-line
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

  const cancel = () => {
    const addItem = document.querySelector(".addItem");
    addItem.style.animation = "slideOut 0.1s ease-in forwards";
    setAnim1(false);
  };

  useEffect(() => {}, [item, items]);

  const select = (suggestion) => {
    setItem({ ...item, category: suggestion });
    setSuggestions([]);
  };

  return (
    <div className="addItem" id="addItem">
      <SimpleBar style={{ maxHeight: "100%" }}>
        <div className="container">
          {loader2 && loader2 === "add" && (
            <div className="loader">
              <ButtonSpinner />
            </div>
          )}
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
                    placeholder="Category"
                  />
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
              <button onClick={cancel}>cancel</button>
              <button
                onClick={save}
                disabled={loader2 && loader2 === "add" ? true : false}
              >
                Save
              </button>
            </div>
          </form>

          <div style={{ marginTop: "20px" }}></div>
        </div>
      </SimpleBar>
    </div>
  );
};

AddItem.propTypes = {
  setAnim1: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.items,
});

export default connect(mapStateToProps, { addItem })(AddItem);
