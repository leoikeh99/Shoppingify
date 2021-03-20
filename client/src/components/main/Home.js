import React, { useEffect, useState } from "react";
import NavBar from "../layout/NavBar";
import SideBar from "./sidebar/SideBar";
import Items from "./items/Items";
import History from "./history/History";
import Stats from "./stats/Stats";
import AddItem from "./items/AddItem";
import ViewItem from "./items/ViewItem";
import EditItem from "./items/EditItem";
import CartOptions from "./sidebar/cart/CartOptions";
import CancelCart from "./sidebar/cart/CancelCart";
import { getUser } from "../../actions/authActions";
import { clearStatus } from "../../actions/itemActions";
import { clearStatus2 } from "../../actions/cartActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SimpleBar from "simplebar-react";
import M from "materialize-css/dist/js/materialize.min.js";

const Home = ({ getUser, clearStatus, status, status2 }) => {
  const [nav, setNav] = useState("items");
  const [anim1, setAnim1] = useState(false);

  useEffect(() => {
    getUser();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (status) {
      const viewItem = document.querySelector(".viewItem");
      M.toast({ html: status.msg });
      document
        .querySelectorAll(".toast")
        .forEach((toast) => (toast.style.background = status.color));

      if (status) {
        viewItem.style.animation = "slideOut 0.1s ease-in forwards";
      }
      clearStatus();
    }

    if (status2) {
      M.toast({ html: status2.msg });
      document
        .querySelectorAll(".toast")
        .forEach((toast) => (toast.style.background = status2.color));

      clearStatus2();
    }
  }, [status, status2]);

  return (
    <div className="home">
      <NavBar nav={nav} setNav={setNav} />
      <div className="main">
        <SimpleBar style={{ maxHeight: "100%" }}>
          <div className="container">
            {nav === "items" ? (
              <Items setAnim1={setAnim1} />
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
      <ViewItem />
      <EditItem />
      <CartOptions />
      <CancelCart />
    </div>
  );
};

Home.propTypes = {
  user: PropTypes.object,
  getUser: PropTypes.func.isRequired,
  clearStatus: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  status: state.items.status,
  status2: state.cart.status2,
});

export default connect(mapStateToProps, { getUser, clearStatus })(Home);
