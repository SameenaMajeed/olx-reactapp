import React, { useContext } from "react";

import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { AuthContext, FirebaseContext } from "../../store/Context";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { PostContext } from "../../store/PostContext";

function Header() {
  const { user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  const { setPostDetails } = useContext(PostContext);
  const navigate = useNavigate();

  const warnMsg = () => {
    alert("Please login");
  };

  const handleLogout = async () => {
    try {
      const auth = getAuth(firebase);

      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <NavLink to="/">
            <OlxLogo></OlxLogo>
          </NavLink>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>
            {user ? (
              `Welcome ${user.displayName}`
            ) : (
              <NavLink
                style={{ textDecoration: "none", color: "black" }}
                to="/login"
              >
                Login
              </NavLink>
            )}
          </span>
          <hr />
        </div>
        <div>
          {user && (
            <span style={{ cursor: "pointer" }} onClick={handleLogout}>
              Logout
            </span>
          )}
        </div>

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            {user ? (
              <NavLink
                style={{ color: "black", textDecoration: "none" }}
                to="/create"
              >
                <span>SELL</span>
              </NavLink>
            ) : (
              <span onClick={warnMsg}>SELL</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
