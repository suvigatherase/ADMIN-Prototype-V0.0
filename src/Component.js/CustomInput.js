import React from "react";
import { useField } from "formik";
const CustomInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  console.log(field, "FIELD");
  return (
    <>
      <label>{label}</label>
      <input
        {...field}
        {...props}
        className={meta.touched && meta.error ? "input-error " : ""}
      />
      {meta.touched && meta.error && <div>{meta.error}</div>}
    </>
  );
};

export default CustomInput;
