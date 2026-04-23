import { FaRegSadCry } from "react-icons/fa";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      
      <div className="text-center space-y-5 max-w-md">

        {/* Icon */}
        <div className="flex justify-center">
          <FaRegSadCry className="text-7xl text-primary animate-bounce" />
        </div>

        {/* Error Code */}
        <h1 className="text-6xl font-bold text-error">404</h1>

        {/* Message */}
        <h2 className="text-2xl font-semibold">
          Oops! Page Not Found
        </h2>

        <p className="text-gray-500">
          তুমি যেই পেজ খুঁজছো সেটা পাওয়া যায়নি বা delete করা হয়েছে।
        </p>

        {/* Button */}
        <Link
          to="/"
          className="btn btn-primary mt-4 px-6"
        >
          Go Back Home
        </Link>

      </div>
    </div>
  );
};

export default ErrorPage;