import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [phone, setPhone] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [error, setError] = useState("");

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = (e) => {
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
          axios
          .post("http://127.0.0.1:5000/api/v1/users/signup", registered)
          .then((response) => {
            console.log(response.data);
            props.onFormSwitch("login");
          }).catch((error) => {
            setError(error);
          });

          // .then((response) => console.log(response.data))
          // .then(props.onFormSwitch("login")).catch((error) => {
          //   setError(error);
          // });

    };
  };

  const handleValidation = () => {

    if (pass !== passConfirm) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (name.length < 2) {
      toast.error(
        "Name should be greater than 3 characters.",
        toastOptions
      );
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
    }
    else if (phone.length<10) {
      toast.error("Phone should be equal to 10 digits.", toastOptions);
      return false;
    }

    return true;
  };

  return (
    <>
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        {/* <label htmlFor="name">Full name</label> */}
        <input
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
          id="name"
          placeholder="Name"
        />
        {/* <label htmlFor="email">email</label> */}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          id="email"
          name="email"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="text"
          placeholder="Phone Number"
          id="phone"
          name="phone"
        />
        {/* <label htmlFor="password">password</label> */}
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="Password"
          id="password"
          name="password"
        />
        {/* <label htmlFor="passwordConfirm">confirm password</label> */}
        <input
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
      <button className="link-btn" onClick={() => props.onFormSwitch("login")}>
        Already have an account? Login <font color="red">here</font>
      </button>
    </div>
    <ToastContainer />
  </>
  );
  
};
