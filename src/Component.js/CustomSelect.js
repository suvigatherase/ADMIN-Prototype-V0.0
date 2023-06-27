import React from "react";
import { useField } from "formik";
const CustomSelect = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  console.log(field, "FIELD");
  return (
    <>
      <label>{label}</label>
      <select
        {...field}
        {...props}
        className={meta.touched && meta.error ? "input-error " : ""}
      />
      {meta.touched && meta.error && <div>{meta.error}</div>}
    </>
  );
};

export default CustomSelect;
