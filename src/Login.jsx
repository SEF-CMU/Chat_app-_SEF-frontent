import React, { useState } from "react";
import axios from "axios";
export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const loggedin = {
      email: email,
      password: pass,
    };

    // connect to api
    axios
      .post("http://127.0.0.1:5000/api/v1/users/login", loggedin)
      .then((response) => console.log(response.data));
  };

  return (
    <div className="auth-form-container ">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        {/* <label htmlFor="email">email</label> */}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        {/* <label htmlFor="password">password</label> */}
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button className="sub-btn" type="submit">
          Log In
        </button>
      </form>
      <button
        className="link-btn"
        onClick={() => props.onFormSwitch("register")}
      >
        Don't have an account? Register <font color="red">here</font>
      </button>
    </div>
  );
};
