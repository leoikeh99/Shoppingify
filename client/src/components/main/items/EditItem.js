import React, { useEffect, useState } from "react";
import SimpleBar from "simplebar-react";
import { connect } from "react-redux";
import { editItem } from "../../../actions/itemActions";
import PropTypes from "prop-types";

const EditItem = ({ current, editItem }) => {
  const [validate, setValidate] = useState(null);
  const [item, setItem] = useState({
    name: "",
    note: null,
    image: null,
    category: "",
  });

  const onChange = (e) => {
    setValidate(null);
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const editItem = document.querySelector(".editItem");
    if (current && current.type === "edit") {
      setItem(current.data);
      editItem.style.animation = "slideIn 0.1s ease-in forwards";
    } else {
      editItem.style.right = "-380px";
      editItem.style.animation = "none";
    }
  }, [current]);

  const back = () => {
    const editItem = document.querySelector(".editItem");
    editItem.style.animation = "slideOut 0.1s ease-in forwards";
  };

  const save = () => {
    const data = {
      name: item.name,
      category: item.category,
      note: item.note,
      image: item.image,
    };

    if (data.image && data.image.trim() !== "") {
      const code = /(https?:\/\/.*\.(?:png|jpg))/i;
      if (code.test(data.image)) {
        setValidate(null);
        editItem(data, current.data._id);
      } else {
        setValidate("Invalid image url");
      }
    } else {
      setValidate(null);
      editItem(data, current.data._id);
    }
  };

  return (
    <div className="editItem">
      <SimpleBar style={{ maxHeight: "100%" }}>
        <div className="container">
          <div style={{ marginTop: "10px" }}></div>
          <span className="back" style={{ marginLeft: "0" }} onClick={back}>
            <i className="material-icons">arrow_back</i>back
          </span>
          <h5>Edit item</h5>
          <form action="" onSubmit={(e) => e.preventDefault()}>
            <div className="row">
              <div className="input-field ">
                <input
                  type="text"
                  name="name"
                  id="name2"
                  value={item.name}
                  required
                  placeholder="Name"
                  onChange={onChange}
                />
              </div>
              <div className="input-field">
                <input
                  type="text"
                  name="note"
                  id="note2"
                  value={!item.note ? "" : item.note}
                  placeholder="Note (optional)"
                  onChange={onChange}
                />
              </div>
              <div className="input-field">
                <input
                  type="text"
                  name="image"
                  id="image2"
                  value={!item.image ? "" : item.image}
                  placeholder="Image url (optional)"
                  onChange={onChange}
                />

                {validate && (
                  <span className="helper-text  red-text darken-1">
                    {validate}
                  </span>
                )}
              </div>
              <div className="input-field" style={{ marginBottom: "0px" }}>
                <input
                  type="text"
                  name="category"
                  id="category2"
                  value={item.category}
                  required
                  placeholder="Category"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="center">
              <button onClick={save}>Save</button>
            </div>
          </form>
        </div>
      </SimpleBar>
    </div>
  );
};

const mapStateToProps = (state) => ({ current: state.items.current });

export default connect(mapStateToProps, { editItem })(EditItem);
