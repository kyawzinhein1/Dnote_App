import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Details = ({ isCreate }) => {
  return (
    <section className="px-10 mt-4">
      <Link to={"/"} className="flex justify-end">
        <ArrowLeftIcon width={20} />
      </Link>
      <div className="border-t-4 border-t-teal-400 shadow-lg p-3 mt-6">
        <h3 className="text-2xl">Lorem ipsum dolor</h3>
        <p className="text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero sequi
          sed, illum soluta maiores neque distinctio veritatis!
        </p>
      </div>
    </section>
  );
};

export default Details;
