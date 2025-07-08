import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";

function Dashboard() {
  const { logindata, setLoginData } = useContext(LoginContext);
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
      setLoginData(data); // Make sure to update context here
    }
  };

  useEffect(() => {
    DashboardValid();
  }, []);

  return (
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
  );
}

export default Dashboard;
