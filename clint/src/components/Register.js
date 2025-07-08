import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./mix.css";

const Register = () => {
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);
  const [inpVal, setInpval] = useState({
    fname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const setVal = (e) => {
    const { name, value } = e.target;
    setInpval((prevState) => ({ ...prevState, [name]: value }));
  };

  const addUserdata = async (e) => {
    e.preventDefault();
    const { fname, email, password, cpassword } = inpVal;

    // Frontend validation
    if (fname === "") {
      alert("Please enter Your First name!..");
    } else if (email === "") {
      alert("Please enter Your Email!..");
    } else if (!email.includes("@")) {
      alert("Enter valid email!...");
    } else if (password === "") {
      alert("Please enter password!...");
    } else if (password.length < 6) {
      alert("Password must be at least 6 characters!...");
    } else if (cpassword === "") {
      alert("Please enter confirm password!...");
    } else if (cpassword.length < 6) {
      alert("Confirm password must be at least 6 characters!...");
    } else if (password !== cpassword) {
      alert("Password and confirm password do not match!");
    } else {
      try {
        const response = await fetch("/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fname,
            email,
            password,
            cpassword,
          }),
        });

        const resData = await response.json();

        console.log("Response Status:", response.status);
        console.log("Response Data:", resData);

        if (response.status === 201) {
          alert("User registration done successfully!");
          setInpval({
            fname: "",
            email: "",
            password: "",
            cpassword: "",
          });
        } else if (response.status === 422) {
          alert(
            "Validation failed: " + (resData.message || "Check input data")
          );
        } else {
          alert("Registration failed. Please try again.");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        alert("Server error. Please try later.");
      }
    }
  };

  return (
    <section>
      <div className="form_data">
        <div className="form_heading">
          <h1>Sign Up</h1>
          <p style={{ textAlign: "center" }}>
            We are glad that you will be using Project Cloud to manage <br />
            your tasks! We hope that you will like it.
          </p>
        </div>

        <form onSubmit={addUserdata}>
          <div className="form_input">
            <label htmlFor="fname">Name</label>
            <input
              type="text"
              onChange={setVal}
              value={inpVal.fname}
              name="fname"
              id="fname"
              placeholder="Enter Your Name"
            />
          </div>

          <div className="form_input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              onChange={setVal}
              value={inpVal.email}
              name="email"
              id="email"
              placeholder="Enter Your Email Address"
            />
          </div>

          <div className="form_input">
            <label htmlFor="password">Password</label>
            <div className="two">
              <input
                type={passShow ? "text" : "password"}
                onChange={setVal}
                value={inpVal.password}
                name="password"
                id="password"
                placeholder="Enter Your password"
              />
              <div className="showpass" onClick={() => setPassShow(!passShow)}>
                {passShow ? "Hide" : "Show"}
              </div>
            </div>
          </div>

          <div className="form_input">
            <label htmlFor="cpassword">Confirm Password</label>
            <div className="two">
              <input
                type={cpassShow ? "text" : "password"}
                onChange={setVal}
                value={inpVal.cpassword}
                name="cpassword"
                id="cpassword"
                placeholder="Confirm password"
              />
              <div
                className="showpass"
                onClick={() => setCPassShow(!cpassShow)}
              >
                {cpassShow ? "Hide" : "Show"}
              </div>
            </div>
          </div>

          <button className="btn" type="submit">
            Sign Up
          </button>
          <p>
            Already have an account? <NavLink to="/">Log In</NavLink>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
