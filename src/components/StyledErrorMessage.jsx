import { ErrorMessage } from "formik";

const StyledErrorMessage = ({ name }) => {
  return (
    <div className="text-red-600 font-bold">
      <ErrorMessage name={name} />
    </div>
  );
};

export default StyledErrorMessage;
