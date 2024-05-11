import { useEffect, useState } from "react";
import Note from "../components/Note";
import { RotatingLines } from "react-loader-spinner";

import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getNotes = async (pageNumber) => {
    setLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_API}/notes?page=${pageNumber}`
    );
    const { notes, totalNotes, totalPages } = await response.json();
    setTotalPages(totalPages);
    setNotes(notes);
    setLoading(false);
  };

  useEffect(
    (_) => {
      getNotes(currentPage);
    },
    [currentPage]
  );

  const handlePre = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const customAlert = (message) => {
    toast.warning(message, {
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

  return (
    <section className="flex gap-5 flex-wrap justify-center">
      {!loading && notes.length > 0 ? (
        <>
          {notes.map((note) => (
            <Note
              key={note._id}
              note={note}
              getNotes={getNotes}
              customAlert={customAlert}
            />
          ))}
          <div className="w-full flex items-center justify-center gap-5 mb-10">
            {currentPage > 1 && (
              <button
                type="button"
                className="text-white font-medium bg-teal-600 px-3 py-1 rounded-sm"
                onClick={handlePre}
              >
                Prev Page
              </button>
            )}
            {currentPage < totalPages && (
              <button
                type="button"
                className="text-white font-medium bg-teal-600 px-3 py-1 rounded-sm"
                onClick={handleNext}
              >
                Next Page
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center w-full h-96">
          <RotatingLines
            visible={loading}
            height="60"
            width="60"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          {!loading && notes.length === 0 && <p>Notes are not shared yet.</p>}
        </div>
      )}
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
    </section>
  );
};

export default Index;
