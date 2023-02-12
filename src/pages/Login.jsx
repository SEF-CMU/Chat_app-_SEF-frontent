import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loggedin = {
      email: email,
      password: pass,
    };
    try {
      // connect to api
      const { data } = await axios.post(
        "http://127.0.0.1:4000/api/v1/users/login",
        loggedin
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.id);
      history.push("/chats");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="ccc">
      <div className="auth-form-container ">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          {/* <label htmlFor="email">email</label> */}
          <input
            style={{
              margin: "10px 0",
              padding: "5px",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
          />
          {/* <label htmlFor="password">password</label> */}
          <input
            style={{
              margin: "10px 0",
              padding: "5px",
            }}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />
          <button className="sub-btn" type="submit">
            Login
          </button>
        </form>
        <button className="link-btn">
          Don't have an account? Register{" "}
          <NavLink to="/register">
            <font color="red">here</font>
          </NavLink>
        </button>
      </div>
    </div>
  );
};
