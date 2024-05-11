import { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";

const Navbar = () => {
  const { token, updateToken } = useContext(UserContext);

  const logoutHandler = () => {
    updateToken(null);
  };

  return (
    <nav className="bg-slate-200 flex items-center justify-between px-10 mb-8">
      <Link to={"/"} className="text-3xl text-teal-600 font-bold py-2">
        SHARENOTE
      </Link>
      <div className="flex gap-3">
        {token ? (
          <>
            <Link to={"/create"} className="text-teal-600 font-medium">
              CREATE
            </Link>
            <button
              type="button"
              className="text-teal-600 font-medium cursor-pointer"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to={"/login"} className="text-teal-600 font-medium">
              Login
            </Link>
            <Link to={"/register"} className="text-teal-600 font-medium">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
