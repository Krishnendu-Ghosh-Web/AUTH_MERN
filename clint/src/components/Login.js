import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import "../components/mix.css";

function Login() {
  const [passShow, setPassShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [inpVal, setInpval] = useState({
    email: "",
    password: "",
  });

  const histry = useNavigate(); // for redirection after login

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const setVal = (e) => {
    const { name, value } = e.target;
    setInpval((prevState) => ({ ...prevState, [name]: value }));
  };

  const loginuser = async (e) => {
    e.preventDefault();
    const { email, password } = inpVal;

    // Frontend validation
    if (email === "") {
      alert("Please enter Your Email!");
    } else if (!email.includes("@")) {
      alert("Enter a valid email!");
    } else if (password === "") {
      alert("Please enter password!");
    } else if (password.length < 6) {
      alert("Password must be at least 6 characters!");
    } else {
      try {
        const data = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const res = await data.json();
        console.log("Response:", res);

        if (data.status === 201) {
          localStorage.setItem("usersdatatoken", res.result.token);
          setInpval({ email: "", password: "" });
          alert("Login successful!");
          histry("/dash"); // replace with your dashboard route
        } else if (data.status === 422) {
          alert(res.message || "Invalid input data.");
        } else {
          alert(res.message || "Login failed. Check your credentials.");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("Server error. Try again later.");
      }
    }
  };

  return (
    <div>
      <section>
        <div className="form_data">
          <div className="form_heading">
            {loading ? (
              <>
                <Skeleton variant="text" width={250} height={40} />
                <Skeleton variant="text" width={300} height={30} />
              </>
            ) : (
              <>
                <h1>Welcome Back, Log In</h1>
                <p>Hi, we are glad you are back. Please login.</p>
              </>
            )}
          </div>

          <form onSubmit={loginuser}>
            <div className="form_input">
              {loading ? (
                <>
                  <Skeleton variant="text" width={50} height={20} />
                  <Skeleton variant="rectangular" width={300} height={40} />
                </>
              ) : (
                <>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={inpVal.email}
                    onChange={setVal}
                    id="email"
                    placeholder="Enter Your Email Address"
                  />
                </>
              )}
            </div>

            <div className="form_input">
              {loading ? (
                <>
                  <Skeleton variant="text" width={80} height={20} />
                  <Skeleton variant="rectangular" width={300} height={40} />
                </>
              ) : (
                <>
                  <label htmlFor="password">Password</label>
                  <div className="two">
                    <input
                      type={!passShow ? "password" : "text"}
                      value={inpVal.password}
                      onChange={setVal}
                      name="password"
                      id="password"
                      placeholder="Enter Your password"
                    />
                    <div
                      className="showpass"
                      onClick={() => setPassShow(!passShow)}
                    >
                      {!passShow ? "Show" : "Hide"}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="form_input">
              {loading ? (
                <Skeleton variant="rectangular" width={300} height={45} />
              ) : (
                <button className="btn" type="submit">
                  Login
                </button>
              )}
            </div>

            <div className="form_input">
              {loading ? (
                <Skeleton variant="text" width={200} height={20} />
              ) : (
                <p>
                  Don't have an Account?{" "}
                  <NavLink to="/register">Sign Up</NavLink>
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Login;
