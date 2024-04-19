import React from "react";
import NoteForm from "../components/NoteForm";

const Create = () => {
  return (
    <div className="px-10 mt-4">
      <NoteForm isCreate={true} />
    </div>
  );
};

export default Create;
