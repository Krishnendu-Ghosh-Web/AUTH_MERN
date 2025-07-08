import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Dashboard() {
  const { logindata, setloginData } = useContext(LoginContext);
  const [data, setData] = useState(false);
  const history = useNavigate();

  console.log(logindata?.validuserOne?.email);

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");
    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await res.json();

    if (data.status == 401 || !data) {
      history("*");
    } else {
      console.log("user verify");
      history("/dash");
      setloginData(data); // Make sure to update context here
    }
  };

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setData(true);
    }, 2000);
  }, []);

  return data ? (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <img
        src="./man.png"
        style={{ width: "200px", marginTop: "20px" }}
        alt=""
      />
      <h1>User Email: {logindata ? logindata.validuserOne?.email : ""}</h1>
    </div>
  ) : (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      Loading...&nbsp;
      <CircularProgress />
    </Box>
  );
}

export default Dashboard;
