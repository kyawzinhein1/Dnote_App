import { useEffect, useState } from "react";
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { Link, useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { formatISO9075 } from "date-fns";

const Details = () => {
  const { id } = useParams();

  const [note, setNote] = useState([]);
  const [loading, setLoading] = useState(false);

  const getNote = async () => {
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_API}/notes/${id}`);
    const note = await response.json();
    setNote(note);
    setLoading(false);
  };

  useEffect((_) => {
    getNote();
  }, []);

  return (
    <>
      {loading ? (
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
      ) : (
        <section className="px-10 mt-10">
          <Link to={"/"} className="flex justify-end">
            <ArrowLeftIcon width={20} />
          </Link>
          <div className="border-t-4 border-t-teal-600 shadow-lg p-3 mt-4">
            <h3 className="text-3xl font-medium">{note.title}</h3>
            <div className="flex gap-4 my-2">
              <p className=" flex items-center gap-1 font-medium text-sm text-gray-600">
                <UserIcon className="w-4 h-4" />
                {note.author}
              </p>
              {note.createdAt && (
                <p className=" flex items-center gap-1 font-medium text-sm text-gray-600">
                  <CalendarDaysIcon className=" w-4 h-4" />
                  {formatISO9075(new Date(note.createdAt), {
                    representation: "date",
                  })}
                </p>
              )}
            </div>
            <p className="text-base mt-2">{note.content}</p>
          </div>
        </section>
      )}
    </>
  );
};

export default Details;
