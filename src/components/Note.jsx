import React from "react";
import {
  TrashIcon,
  PencilSquareIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";

const Note = ({ note }) => {
  const { _id, title, content, createdAt } = note;

  return (
    <div className="w-2/5 border-t-4 border-t-teal-400 shadow-lg p-3 mt-6 rounded-md h-fit">
      <h3 className="text-xl">{title}</h3>
      <p className="text-sm">{content.substring(0, 100)}</p>
      <hr className="mt-3" />
      <div className="flex items-center justify-between mt-3">
        <p className="text-sm">
          {formatISO9075(new Date(createdAt), { representation: "date" })}
        </p>
        <div className="flex items-center gap-2 justify-end">
          <TrashIcon width={20} className="text-red-600" />
          <Link to={"/edit/" + _id}>
            <PencilSquareIcon width={20} className="text-teal-600" />
          </Link>
          <Link to={"/notes/" + _id}>
            <EyeIcon width={20} className="text-gray-600" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Note;
