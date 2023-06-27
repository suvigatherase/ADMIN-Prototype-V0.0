import React, { useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { useState } from "react";
import rover from "../rover/roverApiConfig";
import * as yup from "yup";

const LoginPage = ({ handleLogin }) => {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });
  const [status, setStatus] = useState("");
  const [loginErrors, setLoginErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [responseFromAuth, setResponseFromAuth] = useState("");

  useEffect(() => {
    console.log(loginErrors);
    if (Object.keys(loginErrors).length === 0 && isSubmit) {
      console.log(loginDetails);
    }
  }, [loginErrors]);

  function handleUsernamechange(e) {
    setLoginDetails({ ...loginDetails, username: e.target.value });
  }

  function handlePasswordchange(e) {
    setLoginDetails({ ...loginDetails, password: e.target.value });
  }

  function handleChange(e) {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
    // setLoginErrors(validate(loginDetails));
  }

  function handleLoginFormSubmit(e) {
    e.preventDefault(); //this prevents default browser beahvior:Like REFRESH
    // setLoginErrors(validate(loginDetails));
    setLoginErrors(validate2.validate(loginDetails));
    //customValidation.validate({ beverage: "tea" });
    setIsSubmit(true);
    console.log(isSubmit, "isSubmit");
    console.log(loginDetails, "loginDetails");
    if (Object.keys(loginErrors).length === 0) {
      rover
        .post("/auth", loginDetails)
        .then((res) => {
          // setResponseFromAuth(res.data);
          console.log(res.status, "Response");
          handleLogin(res.status);
        })
        .catch((error) => {
          if (error.response) {
            // status code out of the range of 2xx
            console.log("Data :", error.response.data);
            console.log("Status :" + error.response.status);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Error on setting up the request
            console.log("Error", error.message);
          }
        });
    }
  }
  const validate = (formadata) => {
    const formError = {};
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i;
    const usernameRegex = /^(?=.*[a-z])[a-z]{8,}$/i;
    if (!formadata.username) {
      formError.username = "UserName Required";
    } else if (!usernameRegex.test(formadata.username)) {
      formError.username = "UserName: Must be min 8 alphacharacters Long;";
    }
    if (!formadata.password) {
      formError.password = "Password Required";
    } else if (!passwordRegex.test(formadata.password)) {
      formError.password =
        "Not A valid Password:Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character";
    }
    return formError;
  };
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i;
  const validate2 = yup.object().shape({
    username: yup.string().required("Required"),
    password: yup
      .string()
      .min(8)
      .matches(
        passwordRegex,
        "Not A valid Password:Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special characte"
      )
      .required("Required"),
  });
  function handleClick(e) {
    e.preventDefault(); //in this case it stops the default action form Submit :handleLoginFormSubmit
    alert("clicked");

    rover.get("/isAlive").then((res) => {
      console.log(res.data, "Response");
      setStatus(res.data);
    });
  }

  return (
    <div>
      <h2>
        <i>Login Page</i>
      </h2>

      <div className="ui divider"></div>
      <form className="ui form" onSubmit={handleLoginFormSubmit}>
        <div className="field">
          <label>UserName</label>

          <input
            name="username"
            type="text"
            value={loginDetails.username}
            placeholder="UserName"
            onChange={handleChange}
          />
        </div>
        <p>{loginErrors.username}</p>
        <div className="field">
          <label>Password</label>

          <input
            name="password"
            type="password"
            value={loginDetails.password}
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <p>{loginErrors.password}</p>
        <button className="ui button blue">Login</button>
        <button className="ui button blue" onClick={handleClick}>
          Checkstatus
        </button>
        {status.length > 0 && `Rover status :${status}`}
      </form>
    </div>
  );
};

export default LoginPage;
