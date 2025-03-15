import { Link } from "react-router-dom";
import notFoundImage from "/images/404.jpg";

export default function NotFound() {
  return (
    <div className="w-7/12 mx-auto my-8">
      <img src={notFoundImage} alt="404 Not Found" className="w-full" />
      <Link
        to="/"
        className="hover:text-gray-950 mt-2 text-gray-800 font-bold py-2 px-4 text-2xl "
      >
        Go back to homepage
      </Link>
    </div>
  );
}
