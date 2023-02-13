import React, { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useToast } from "@chakra-ui/react";

export const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [phone, setPhone] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const toast = useToast();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const registered = {
      name: name,
      email: email,
      phone: phone,
      password: pass,
      passwordConfirm: passConfirm,
    };

    if (handleValidation()) {
      // connect to api
      try {
        const { data } = await axios.post(
          "http://127.0.0.1:4000/api/v1/users/signup",
          registered
        );
        localStorage.setItem("token", data.token);
        localStorage.setItem("id", data.id);
        history.push("/chats");
        window.location.reload();
      } catch (err) {
        setError(err.response.data.message);
        toast({
          title: "Signup failed",
          description: err.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    }
  };

  const handleValidation = () => {
    if (pass !== passConfirm) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (name.length < 2) {
      toast.error("Name should be greater than 3 characters.", toastOptions);
      return false;
    } else if (pass.length < 2) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    } else if (phone.length < 10) {
      toast.error("Phone should be equal to 10 digits.", toastOptions);
      return false;
    }

    return true;
  };

  return (
    <div className="ccc">
      <div className="auth-form-container">
        <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          {/* <label htmlFor="name">Full name</label> */}
          <input
            style={{
              margin: "10px 0",
              padding: "5px",
            }}
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder="Name"
          />
          {/* <label htmlFor="email">email</label> */}
          <input
            style={{
              margin: "10px 0",
              padding: "5px",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            id="email"
            name="email"
          />
          <input
            style={{
              margin: "10px 0",
              padding: "5px",
            }}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            placeholder="Phone Number"
            id="phone"
            name="phone"
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
            placeholder="Password"
            id="password"
            name="password"
          />
          {/* <label htmlFor="passwordConfirm">confirm password</label> */}
          <input
            style={{
              margin: "10px 0",
              padding: "5px",
            }}
            value={passConfirm}
            onChange={(e) => setPassConfirm(e.target.value)}
            type="password"
            placeholder="Confirm Password"
            id="passwordConfirm"
            name="passwordConfirm"
          />
          {error && <p className="error">{error.response.data}</p>}
          <button type="submit" className="sub-btn">
            Sign Up
          </button>
        </form>
        <button className="link-btn">
          Already have an account? Login{" "}
          <NavLink to="/">
            {" "}
            <font color="red">here</font>{" "}
          </NavLink>
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};
