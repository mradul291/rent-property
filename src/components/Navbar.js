import React from "react";
import { Routes, Route, BrowserRouter as Router, Link } from "react-router-dom";
import Sell from "./Sell";
import Buy from "./Buy";
import Rent from "./Rent/Rent";
import ManageProperty from "./ManageProperty";
import Resources from "./Resources";
import Favourites from "./Favourites";
import Logo from "../assets/images/logo.png";

function Navbar(props) {
  return (
    <Router>
      <div className="nav-bar">
        <div className="custom-container">
          <div className="navigation-bar">
            <div id="navigation-container">
              <div className="logo">
                <img src={Logo} alt="logo" />
              </div>
              <ul>
                <li key={"rent"}>
                  <Link to="/rent">Rent</Link>
                </li>
                <li key={"buy"}>
                  <Link to="/buy">Buy</Link>
                </li>
                <li key={"sell"}>
                  <Link to="/sell">Sell</Link>
                </li>
                <li key={"manage-property"}>
                  <Link to="/manage-property">Manage Property</Link>
                </li>
                <li key={"resources"}>
                  <Link to="/resources">Resources</Link>
                </li>
                <li key={"favourites"}>
                  <Link to="/favourites">Favourites</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Rent />}></Route>
        <Route path="/rent" element={<Rent />}></Route>
        <Route path="/buy" element={<Buy />}></Route>
        <Route path="/sell" element={<Sell />}></Route>
        <Route path="/manage-property" element={<ManageProperty />}></Route>
        <Route path="/resources" element={<Resources />}></Route>
        <Route path="/favourites" element={<Favourites />}></Route>
      </Routes>
    </Router>
  );
}

export default Navbar;
