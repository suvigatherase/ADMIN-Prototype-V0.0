import React from "react";
import "semantic-ui-css/semantic.min.css";
import rover from "../rover/roverApiConfig.js";
import { Form, Field, Formik } from "formik";
import CustomInput from "../Component.js/CustomInput.js";
import CustomSelect from "../Component.js/CustomSelect.js";
import { loginSchema2 } from "../Schemas/LoginValidationSchema.js";
const LoginWithFormikComponent = () => {
  return (
    <div>
      <h2>
        <i>React Admin UI-Mock</i>
      </h2>
      <Formik
        initialValues={{ userName: "Test-mock-user", roleType: "" }}
        validationSchema={loginSchema2}
      >
        {(props) => (
          <div>
            <Form>
              <CustomInput
                label="UserName"
                name="username"
                type="text"
                placeholder="Enter UserName"
              />
              <CustomSelect
                label="Role"
                name="roleType"
                placeholder="Enter your Role"
              >
                <option value="">Please Select an Option</option>
                <option value="developer">Developer</option>
                <option value="ba">BA</option>
                <option value="productmanager">Product Manager</option>
                <option value="tester">Tester</option>
              </CustomSelect>

              <Field type="text" name="name" placeholder="Name" />

              <button className="ui button blue" type="submit">
                Submit
              </button>
              {/* </form> */}
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default LoginWithFormikComponent;
