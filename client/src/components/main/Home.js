import React, { useEffect, useState } from "react";
import NavBar from "../layout/NavBar";
import SideBar from "./sidebar/SideBar";
import Items from "./items/Items";
import History from "./history/History";
import Stats from "./stats/Stats";
import AddItem from "./items/AddItem";
import { getUser } from "../../actions/authActions";
import { clearStatus } from "../../actions/itemActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SimpleBar from "simplebar-react";
import M from "materialize-css/dist/js/materialize.min.js";

const Home = ({ getUser, clearStatus, status }) => {
  const [nav, setNav] = useState("items");
  const [anim1, setAnim1] = useState(false);

  useEffect(() => {
    getUser();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (status) {
      M.toast({ html: status.msg });
      document
        .querySelectorAll(".toast")
        .forEach((toast) => (toast.style.background = status.color));
      clearStatus();
    }
  }, [status]);

  return (
    <div className="home">
      <NavBar nav={nav} setNav={setNav} />
      <div className="main">
        <SimpleBar style={{ maxHeight: "100%" }}>
          <div className="container">
            {nav === "items" ? (
              <Items />
            ) : nav === "history" ? (
              <History />
            ) : nav === "stats" ? (
              <Stats />
            ) : null}
          </div>
        </SimpleBar>
      </div>
      <SideBar setAnim1={setAnim1} />
      <AddItem anim1={anim1} setAnim1={setAnim1} />
    </div>
  );
};

Home.propTypes = {
  user: PropTypes.object,
  getUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  status: state.items.status,
});

export default connect(mapStateToProps, { getUser, clearStatus })(Home);
