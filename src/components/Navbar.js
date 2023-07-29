import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchProfile } from "../api/userApi";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Profile from "./Profile";

function Navbar() {
  const navigate = useNavigate();
  // const history = useHistory();
  const [profile, setProfile] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [user, setUser] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    mobilenumber: "",
    username: "",
  });

  const fetchData = async () => {
    try {
      const response = await fetchProfile(setUser);
      return response;
    } catch (err) {
      console.log(err);
    }
  };
  const logoutUser = () => {
    localStorage.removeItem("login_token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    navigate("/login");
    window.location.reload();
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const handleProfileClick = () => {
  //   history.push("/profile", { user });
  // };
  // if (profile) {
  //   return <Profile data={user} />;
  // }
  return (
    <div className="nav">
      <span>TODO LIST</span>
      <div className="navright">
        <span>{user.firstname + " " + user.lastname}</span>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          className="button"
        >
          <img
            className="nav__avatar"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="Netflix avatar"
          />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              navigate("/profile", { state: user });
            }}
          >
            Profile
          </MenuItem>
          <MenuItem onClick={logoutUser}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Navbar;
