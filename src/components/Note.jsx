import React, { useContext } from "react";
import {
  TrashIcon,
  PencilSquareIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../contexts/UserContext";

const Note = ({ note, getNotes, customAlert }) => {
  const { token } = useContext(UserContext);
  const { _id, title, content, createdAt } = note;

  const handleDeleteNote = async () => {
    const localToken = JSON.parse(localStorage.getItem("token"));

    if (!localToken) {
      localStorage.setItem("token", null);
      window.location.reload(false);
    }

    const response = await fetch(`${import.meta.env.VITE_API}/status`, {
      headers: {
        Authorization: `Bearer ${localToken.token}`,
      },
    });

    if (response.status === 401) {
      localStorage.setItem("token", null);
      window.location.reload(false);
    } else {
      deleteNote();
    }
  };

  const deleteNote = async () => {
    const response = await fetch(`${import.meta.env.VITE_API}/delete/${_id}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
    if (response.status === 204) {
      customAlert("Post deleted.");
      getNotes();
    } else {
      customAlert("Auth failed.", true);
    }
  };

  return (
    <div className="w-2/5 border-t-4 border-t-teal-600 shadow-lg p-3 rounded-t-md h-fit">
      <h3 className="text-xl">{title}</h3>
      <p className="text-sm">{content.substring(0, 100)}</p>
      <div className="flex items-center justify-between mt-3 border-t pt-2">
        <p className="text-sm">
          {formatISO9075(new Date(createdAt), { representation: "date" })}
        </p>
        <div className="flex items-center gap-2 justify-end">
          {token && (
            <>
              {note.author.toString() === token.userId && (
                <>
                  <TrashIcon
                    width={20}
                    className="text-red-600 cursor-pointer"
                    onClick={handleDeleteNote}
                  />
                  <Link to={"/edit/" + _id}>
                    <PencilSquareIcon width={20} className="text-teal-600" />
                  </Link>
                </>
              )}
            </>
          )}
          <Link to={"/notes/" + _id}>
            <EyeIcon width={20} className="text-gray-600" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Note;
