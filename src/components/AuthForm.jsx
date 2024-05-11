import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// formik custom error message
import StyledErrorMessage from "./StyledErrorMessage";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";

const AuthForm = ({ isLogin }) => {
  const { updateToken } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const authFormSchema = Yup.object({
    username: isLogin
      ? null
      : Yup.string()
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

  const submitHandler = async (values) => {
    const { email, password, username } = values;
    let END_POINT = `${import.meta.env.VITE_API}/register`;

    if (isLogin) {
      END_POINT = `${import.meta.env.VITE_API}/login`;
    }
    const response = await fetch(END_POINT, {
      method: "POST",
      body: JSON.stringify({ email, password, username }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const toastFire = (message) => {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    };

    const responseData = await response.json();
    if (response.status === 201) {
      setRedirect(true);
    } else if (response.status === 200) {
      updateToken(responseData);
      setRedirect(true);
    } else if (response.status === 400) {
      const pickedMessage = responseData.errorMessage[0].msg;
      toastFire(pickedMessage);
    } else if (response.status === 401) {
      toastFire(responseData.message);
    }
  };

  if (redirect) {
    return <Navigate to={isLogin ? "/" : "/login"} />;
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
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
            {!isLogin && (
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
            )}
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
    </>
  );
};

export default AuthForm;
