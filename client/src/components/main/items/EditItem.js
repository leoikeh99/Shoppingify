import React from "react";
import SimpleBar from "simplebar-react";

const EditItem = () => {
  return (
    <div className="editItem">
      <SimpleBar style={{ maxHeight: "100%" }}>
        <div className="container">
          <div style={{ marginTop: "35px" }}></div>
          <h5>Edit item</h5>
          <form action="" onSubmit={(e) => e.preventDefault()}>
            <div className="row">
              <div className="input-field ">
                <input type="text" name="name" id="name" required />
                <label htmlFor="name">Name</label>
              </div>
              <div className="input-field">
                <input type="text" name="note" id="note" />
                <label htmlFor="note">Note (optional)</label>
              </div>
              <div className="input-field ">
                <input type="text" name="image" id="image" />
                <label htmlFor="image">Image url (optional)</label>
              </div>
              <div className="input-field" style={{ marginBottom: "0px" }}>
                <input type="text" name="category" id="category" required />
                <label htmlFor="category">Category</label>
              </div>
            </div>
          </form>
        </div>
      </SimpleBar>
    </div>
  );
};

export default EditItem;
