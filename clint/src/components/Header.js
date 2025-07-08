import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import "../components/header.css";
import { LoginContext } from "./ContextProvider/Context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

function Header() {
  const { logindata, setloginData } = useContext(LoginContext);
  const history = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutuser = async () => {
    let token = localStorage.getItem("usersdatatoken");
    const res = await fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);

    if (data.status === 201) {
      console.log("user logout");
      localStorage.removeItem("usersdatatoken");
      setloginData(false);
      history("/");
    } else {
      console.log("error");
    }
  };

  const goDash = () => {
    history("/dash");
  };

  const goError = () => {
    history("*");
  };

  // Debugging - check data in console
  console.log("Login Data:", logindata);

  return (
    <div>
      <header>
        <nav>
          <h1>𝕂𝕣𝕚𝕤𝕙𝕟𝕠𝕧𝕒</h1>
          <div className="avtar">
            {logindata.validuserOne ? (
              <Avatar
                style={{
                  background: "salmon",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
                onClick={handleClick}
              >
                {logindata.validuserOne.fname
                  ? logindata.validuserOne.fname[0].toUpperCase()
                  : ""}
              </Avatar>
            ) : (
              <Avatar style={{ background: "blue" }} onClick={handleClick} />
            )}
          </div>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                "aria-labelledby": "basic-button",
              },
            }}
          >
            {logindata.validuserOne ? (
              <>
                <MenuItem
                  onClick={() => {
                    goDash();
                    handleClose();
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    logoutuser();
                    handleClose();
                  }}
                >
                  Logout
                </MenuItem>
              </>
            ) : (
              <MenuItem
                onClick={() => {
                  goError();
                  handleClose();
                }}
              >
                Profile
              </MenuItem>
            )}
          </Menu>
        </nav>
      </header>
    </div>
  );
}

export default Header;
