import { Link } from "react-router-dom";

function Navbar() {

  return (

    <nav className="flex justify-between items-center px-12 py-6">

      <Link
        to="/"
        className="text-2xl font-bold text-purple-500"
      >
        CareerForge AI
      </Link>

      <div className="flex gap-10 text-gray-300">

        <a href="#">Features</a>

        <a href="#">About</a>

        <a href="#">Pricing</a>

      </div>

      <div className="flex gap-4">

        <Link
          to="/login"
          className="text-gray-300"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="bg-purple-600 px-5 py-2 rounded-lg hover:bg-purple-700"
        >
          Register
        </Link>

      </div>

    </nav>

  );

}

export default Navbar;