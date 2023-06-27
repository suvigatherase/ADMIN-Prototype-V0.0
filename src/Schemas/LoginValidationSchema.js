import * as yup from "yup";
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i;
export const loginSchema = yup.object().shape({
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

export const loginSchema2 = yup.object().shape({
  username: yup
    .string()
    .min(2, "Should be minimum 2 characters Long")
    .required("Required"),
  // jobType: yup.string().oneOf[("developer", "ba")].required("Required"),
});

export const userInfoSchema = yup.object().shape({
  firstname: yup
    .string()
    .min(2, "Should be minimum 2 characters Long")
    .required("Required"),
  lastname: yup
    .string()
    .min(2, "Should be minimum 2 characters Long")
    .required("Required"),
  // id: yup
  //   .string()
  //   .min(1, "Should be minimum 1 characters Long")
  //   .required("Required"),
  // address: yup.object().shape({
  //   streetname: yup
  //     .string()
  //     .min(2, "Should be minimum 2 characters Long")
  //     .required("Required"),
  //   cityname: yup
  //     .string()
  //     .min(2, "Should be minimum 2 characters Long")
  //     .required("Required"),
  // }),
  // jobType: yup.string().oneOf[("developer", "ba")].required("Required"),
});
