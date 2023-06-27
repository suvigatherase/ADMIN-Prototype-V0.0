import React from "react";
import { useFormik } from "formik";
import { loginSchema } from "../Schemas/LoginValidationSchema.js";
import rover from "../rover/roverApiConfig";
import "semantic-ui-css/semantic.min.css";

const LoginWithFormik = ({ handleLogin }) => {
  // const formik = useFormik({
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (data, actions) => {
      let result = await rover
        .post("/auth", data)
        .then((res) => {
          return res.status;
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
      console.log(result, "RESULT@4PM");
      handleLogin(result);
    },
  });

  return (
    <div>
      <h2>
        <i>Formick Form</i>
      </h2>
      <form className="ui form" autoComplete="off" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="username">Username</label>
          <input
            value={values.username}
            id="username"
            type="text"
            placeholder="enter your username"
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.username && touched.username ? "input-error" : ""}
          ></input>
        </div>
        {errors.username && touched.username && <p>{errors.username}</p>}
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            value={values.password}
            id="password"
            type="password"
            placeholder="enter your password"
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? "input-error" : ""}
          ></input>
        </div>
        {errors.password && touched.password && (
          <p className="error">{errors.password}</p>
        )}
        <button
          className="ui button blue"
          type="submit"
          disabled={isSubmitting}
        >
          SUBMIT
        </button>
      </form>
      {/* {isSubmitting && <Home />} */}
      {/* <Home />} */}
    </div>
  );
};

export default LoginWithFormik;
