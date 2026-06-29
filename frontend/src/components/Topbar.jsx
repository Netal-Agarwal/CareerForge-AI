import { Link } from "react-router-dom";

function Topbar() {
    return (
      <header className="flex justify-between items-center mb-10">
  
        <div>
  
          <h1 className="text-4xl font-bold">
            Welcome Back 👋
          </h1>
  
          <p className="text-gray-400 mt-2">
            Continue building your career.
          </p>
  
        </div>
  
        <Link
            to="/upload-resume"
            className="bg-purple-600 px-8 py-4 rounded-xl hover:bg-purple-700 transition"
        >
            Upload Resume
        </Link>
  
      </header>
    );
  }
  
  export default Topbar;