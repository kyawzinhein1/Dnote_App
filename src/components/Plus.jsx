import { PlusIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Plus = () => {
  return (
    <Link
      to={"/create"}
      className="bg-teal-600 p-2 text-white rounded-full fixed bottom-10 right-10"
    >
      <PlusIcon width={30} height={30} />
    </Link>
  );
};

export default Plus;
