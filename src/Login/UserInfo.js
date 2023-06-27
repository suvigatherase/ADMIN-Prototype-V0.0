import React from "react";
import { useFormik } from "formik";
import "semantic-ui-css/semantic.min.css";
import { userInfoSchema } from "../Schemas/LoginValidationSchema.js";
import rover from "../rover/roverApiConfig";

const UserInfo = () => {
  //FORM sUBMIT cALL
  const onSubmit = async (data, actions) => {
    console.log("HELLLLOOOOOOOO");
    console.log(data, " REQUEST DATA");
    await rover
      .post("/addUser", data)
      .then((res) => {
        console.log(res.status, "STATUS");
        console.log(res.data, "DATA");
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
  };
  //formick useState
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
      firstname: "",
      lastname: "",
      //   address: {
      //     streetname: "",
      //     cityname: "",
      //   },
    },
    validationSchema: userInfoSchema,
    onSubmit,
  });
  console.log(errors, "ERRORS");
  return (
    <div>
      <h2>
        <i>UserInfo</i>
        <form className="ui form" autoComplete="off" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="firstname">FirstName</label>
            <input
              value={values.firstname}
              id="firstname"
              type="text"
              placeholder="enter your first name"
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.firstname && touched.firstname ? "input-error" : ""
              }
            ></input>
            {errors.firstname && touched.firstname && <p>{errors.firstname}</p>}
          </div>
          <div className="field">
            <label htmlFor="lastname">LastName</label>
            <input
              value={values.lastname}
              id="lastname"
              type="text"
              placeholder="enter your last name"
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.lastname && touched.lastname ? "input-error" : ""
              }
            ></input>
            {errors.lastname && touched.lastname && <p>{errors.lastname}</p>}
          </div>

          <button
            className="ui button blue"
            type="submit"
            disabled={isSubmitting}
          >
            SUBMIT
          </button>
        </form>
      </h2>
    </div>
  );
};

export default UserInfo;
