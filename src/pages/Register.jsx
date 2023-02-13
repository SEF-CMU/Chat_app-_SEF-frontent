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
  const history = useHistory();
  const toast = useToast();

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
        toast({
          title: "Signup failed",
          description: err.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });
      }
    }
  };

  const handleValidation = () => {
    if (name===""||email===""||phone===""||pass===""||passConfirm==="") {
      toast({
        title: "Signup failed",
        description: "Please fill all the fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      return false;
    }
    else if (pass !== passConfirm) {
      toast({
        title: "Signup failed",
        description: "Password and confirm password should be same.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      return false;
    } else if (name.length < 3) {
      
      toast({
        title: "Signup failed",
        description: "Name should be greater than 3 characters.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      return false;
    } else if (pass.length <= 3) {

      toast({
        title: "Signup failed",
        description: "Password should be equal or greater than 3 characters.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      return false;
    }  else if (phone.length < 10) {
      toast({
        title: "Signup failed",
        description: "Phone should be equal to 10 digits.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
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
          {/* {error && <p className="error">{error.response.data}</p>} */}
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
