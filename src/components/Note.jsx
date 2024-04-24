import React from "react";
import {
  TrashIcon,
  PencilSquareIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Note = () => {
  return (
    <div className="w-2/5 border-t-4 border-t-teal-400 shadow-lg p-3 mt-6 rounded-md mx-auto">
      <h3 className="text-xl">Lorem ipsum dolor</h3>
      <p className="text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero sequi
        sed, illum soluta maiores neque distinctio veritatis!
      </p>
      <div className="flex items-center gap-2 justify-end mt-3">
        <TrashIcon width={20} className="text-red-600" />
        <Link to={"/edit/1"}>
          <PencilSquareIcon width={20} className="text-teal-600" />
        </Link>
        <Link to={"/note/1"}>
          <EyeIcon width={20} className="text-gray-600" />
        </Link>
      </div>
    </div>
  );
};

export default Note;
