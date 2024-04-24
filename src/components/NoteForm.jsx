import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// formik custom error message
import StyledErrorMessage from "./StyledErrorMessage";

const NoteForm = ({ isCreate }) => {
  const initialValues = {
    title: "",
    content: "",
  };

  const noteFormSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title is too short!")
      .max(30, "Title is too long!")
      .required("Title is required"),
    content: Yup.string()
      .min(5, "Content is too short!")
      .required("Content is required"),
  });

  // const validate = (values) => {
  //   const errors = {};

  //   if (values.title.trim().length < 10) {
  //     errors.title = "Title must have 10 lengths.";
  //   }

  //   if (values.content.trim().length < 10) {
  //     errors.content = "Content must have 10 lengths.";
  //   }

  //   return errors;
  // };

  const submitHandler = (values) => {
    console.log(values);
  };
  return (
    <section>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-teal-600 font-bold mb-4">
          {isCreate ? "Create a new note." : "Edit your note."}
        </h1>
        <Link to={"/"}>
          <ArrowLeftIcon width={20} />
        </Link>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={noteFormSchema}
        onSubmit={submitHandler}
      >
        <Form>
          <div>
            <label htmlFor="title" className="font-medium block">
              Title
            </label>
            <Field
              type="text"
              name="title"
              id="title"
              className="text-lg border-2 border-teal-600 rounded-md py-2 w-full px-2 outline-none"
            />
            <StyledErrorMessage name="title" />
          </div>
          <div>
            <label htmlFor="title" className="font-medium block">
              Content
            </label>
            <Field
              as="textarea"
              rows={5}
              type="text"
              name="content"
              id="content"
              className="text-lg border-2 border-teal-600 rounded-md py-1 w-full px-2 outline-none"
            />
            <StyledErrorMessage name="content" />
          </div>
          <button
            className="w-full bg-teal-600 font-medium text-white py-2 rounded-md mt-2"
            type="submit"
          >
            Save
          </button>
        </Form>
      </Formik>
    </section>
  );
};

export default NoteForm;
