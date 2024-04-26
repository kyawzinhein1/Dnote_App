import { useEffect, useState } from "react";
import Note from "../components/Note";
import Plus from "../components/Plus";
import { RotatingLines } from "react-loader-spinner";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getNotes = async () => {
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_API}/notes`);
    const notes = await response.json();
    setNotes(notes);
    setLoading(false);
  };

  useEffect((_) => {
    getNotes();
  }, []);

  return (
    <section className="flex gap-6 px-10 flex-wrap">
      {!loading && notes.length > 0 ? (
        <>
          {notes.map((note) => (
            <Note key={note._id} note={note} />
          ))}
        </>
      ) : (
        <div className="flex justify-center items-center w-full h-96">
          <RotatingLines
            visible={true}
            height="60"
            width="60"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
      <Plus />
    </section>
  );
};

export default Index;
