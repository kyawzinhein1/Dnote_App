import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const NoteForm = ({ isCreate }) => {
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
      <form>
        <div>
          <label htmlFor="title" className="font-medium block">
            Note Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="text-lg border-2 border-teal-600 rounded-md py-2 w-full px-2 outline-none"
          />
        </div>
        <div>
          <label htmlFor="title" className="font-medium block">
            Note Description
          </label>
          <textarea
            rows={5}
            type="text"
            name="description"
            id="description"
            className="text-lg border-2 border-teal-600 rounded-md py-1 w-full px-2 outline-none"
          />
        </div>
        <button className="w-full bg-teal-600 font-medium text-white py-2 rounded-md mt-2">
          Save
        </button>
      </form>
    </section>
  );
};

export default NoteForm;
