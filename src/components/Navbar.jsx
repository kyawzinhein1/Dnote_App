import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-slate-200 flex items-center justify-between px-10 mb-8">
      <h1 className="text-3xl text-teal-600 font-bold py-2">
        <a href="/">SHARENOTE</a>
      </h1>
      <div>
        <Link to={"/create"} className="text-teal-600 font-medium">
          Create
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
