import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// formik custom error message
import StyledErrorMessage from "./StyledErrorMessage";

const AuthForm = ({ isLogin }) => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const authFormSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username is too short!")
      .max(10, "Username is too long!")
      .required("Username is required!"),
    email: Yup.string()
      .required("Email is required!")
      .email("Please enter a valid email!"),
    password: Yup.string()
      .min(4, "Password is too short!")
      .required("Password is required!"),
  });

  const submitHandler = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={authFormSchema}
      onSubmit={submitHandler}
    >
      {() => (
        <Form className="w-1/2 mx-auto">
          <h1 className="text-center font-bold text-4xl my-4 text-teal-600">
            {isLogin ? "Login" : "Register"}
          </h1>
          <div className="mb-3">
            <label htmlFor="title" className="font-medium block">
              Username
            </label>
            <Field
              type="text"
              name="username"
              id="username"
              className="text-lg border-2 border-teal-600 rounded-md py-2 w-full px-2 outline-none"
            />
            <StyledErrorMessage name="username" />
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="font-medium block">
              Email
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              className="text-lg border-2 border-teal-600 rounded-md py-2 w-full px-2 outline-none"
            />
            <StyledErrorMessage name="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="font-medium block">
              Password
            </label>
            <Field
              type="password"
              name="password"
              id="password"
              className="text-lg border-2 border-teal-600 rounded-md py-2 w-full px-2 outline-none"
            />
            <StyledErrorMessage name="password" />
          </div>
          <button
            className="w-full bg-teal-600 font-medium text-white py-2 rounded-md mt-2"
            type="submit"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
