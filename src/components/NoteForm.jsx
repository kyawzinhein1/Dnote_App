import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// formik custom error message
import StyledErrorMessage from "./StyledErrorMessage";
import { useRef } from "react";

const NoteForm = ({ isCreate }) => {
  const [redirect, setRedirect] = useState(false);
  const [oldNote, setOldNote] = useState({});
  const [previewImg, setPreviewImg] = useState(null);
  const [isUpload, setIsUpload] = useState(false);
  const fileRef = useRef();

  const { id } = useParams();

  const getOldNote = async () => {
    const response = await fetch(`${import.meta.env.VITE_API}/edit/${id}`);
    if (response.status === 200) {
      const note = await response.json();
      setOldNote(note);
    } else {
      setRedirect(true);
    }
  };

  useEffect((_) => {
    if (!isCreate) {
      getOldNote();
    }
  }, []);

  const initialValues = {
    title: isCreate ? "" : oldNote.title,
    content: isCreate ? "" : oldNote.content,
    note_id: isCreate ? "" : oldNote._id,
    cover_image: isCreate ? null : oldNote.cover_image,
  };

  const SUPPORTED_FORMATS = ["image/png", "image/jpg", "image/jpeg"];

  const noteFormSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title is too short!")
      .max(30, "Title is too long!")
      .required("Title is required"),
    content: Yup.string()
      .min(5, "Content is too short!")
      .required("Content is required"),
    cover_image: Yup.mixed()
      .nullable()
      .test(
        "FILE_FORMAT",
        "File type is not support!",
        (value) => !value || SUPPORTED_FORMATS.includes(value.type)
      ),
  });

  const handleImageChange = (event, setFieldValue) => {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      setPreviewImg(URL.createObjectURL(selectedImage));
      setFieldValue("cover_image", selectedImage);
    }
  };

  const clearPreviewImg = (setFieldValue) => {
    setPreviewImg(null);
    setFieldValue("cover_image", null);
    fileRef.current.value = "";
  };

  const submitHandler = async (values) => {
    let API = `${import.meta.env.VITE_API}`;
    let method;

    if (isCreate) {
      API = `${import.meta.env.VITE_API}/create`;
      method = "post";
    } else {
      API = `${import.meta.env.VITE_API}/edit`;
      method = "put";
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("cover_image", values.cover_image);
    formData.append("note_id", values.note_id);
    // <Field type="text" name="note_id" id="note_id" hidden />

    const response = await fetch(API, {
      method,
      body: formData,
    });
    if (response.status === 201 || response.status === 200) {
      setRedirect(true);
    } else {
      toast.error("Something went wrong!", {
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
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <section>
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
        enableReinitialize={true}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form encType="multipart/form-data">
            <div className="mb-3">
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

            <div className="mb-3">
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
            <div className="mb-1">
              <div className="flex items-center justify-between">
                <label htmlFor="cover_image" className="font-medium block mb-1">
                  Cover image{" "}
                  <span className="text-xs font-medium">optional</span>
                </label>
                {previewImg && (
                  <p
                    className="text-teal-600 text-base font-medium cursor-pointer"
                    onClick={(_) => {
                      clearPreviewImg(setFieldValue);
                    }}
                  >
                    clear
                  </p>
                )}
              </div>
              <div>
                {isUpload ? (
                  <p
                    className="text-teal-600 text-base font-medium cursor-pointer"
                    onClick={(_) => {
                      setIsUpload(false);
                    }}
                  >
                    Disable cover photo
                  </p>
                ) : (
                  <p
                    className="text-teal-600 text-base font-medium cursor-pointer"
                    onClick={(_) => {
                      setIsUpload(true);
                    }}
                  >
                    Upload cover photo
                  </p>
                )}
              </div>
              {isUpload && (
                <>
                  <input
                    type="file"
                    name="cover_image"
                    hidden
                    ref={fileRef}
                    onChange={(e) => {
                      handleImageChange(e, setFieldValue);
                    }}
                  />
                  <div
                    className="border border-teal-600 rounded-md flex items-center justify-center text-teal-600 border-dashed h-60 cursor-pointer relative"
                    onClick={(_) => {
                      fileRef.current.click();
                    }}
                  >
                    <ArrowUpTrayIcon width={30} height={30} className="z-20" />
                    {isCreate ? (
                      <>
                        {previewImg && (
                          <img
                            src={previewImg}
                            alt="preview"
                            className="w-full absolute top-0 left-0 h-full object-cover opacity-80 z-10"
                          />
                        )}
                      </>
                    ) : (
                      <img
                        src={
                          previewImg
                            ? previewImg
                            : `${import.meta.env.VITE_API}/${
                                oldNote.cover_image
                              }`
                        }
                        alt="preview"
                        className="w-full absolute top-0 left-0 h-full object-cover opacity-80 z-10"
                      />
                    )}
                  </div>
                </>
              )}
              <StyledErrorMessage name="cover_image" />
            </div>
            <button
              className="w-full bg-teal-600 font-medium text-white py-2 rounded-md mt-2"
              type="submit"
            >
              {isCreate ? "Create Note" : "Update Note"}
            </button>
          </Form>
        )}
      </Formik>
      <br />
    </section>
  );
};

export default NoteForm;
