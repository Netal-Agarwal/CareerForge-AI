import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../services/api";


function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const login = async () => {
    console.log("✅ Login function called");
  
    // Add this line
    console.log("Form Data:", formData);
  
    try {
  
      // Add this line
      console.log("Sending request to backend...");
  
      const response = await api.post("/login", formData);
      
      console.log("LOGIN RESPONSE:", response.data);

      //console.log("✅ SUCCESS");
      //console.log(response);
      
      //console.log(response.data);

      localStorage.setItem(
        "token",
        response.data.access_token
      );
      console.log("TOKEN SAVED:", localStorage.getItem("token"));
      
      navigate("/dashboard");
  
    } catch (error) {
  
      console.log("❌ ERROR");
      console.log(error);
  
      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Response:", error.response.data);
      } else {
        console.log(error.message);
      }
  
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-center">

      <div className="bg-slate-800 p-10 rounded-3xl w-[430px]">

        <h1 className="text-4xl font-bold text-center text-white">
          Login
        </h1>

        <p className="text-gray-400 text-center mt-3">
          Access your CareerForge account
        </p>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mt-10 p-4 rounded-xl bg-slate-900 text-white"
        />

        <div className="relative mt-5">

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-slate-900 text-white"
          />

          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4 text-gray-400"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>

        </div>

        <button
          onClick={login}
          className="w-full mt-8 bg-purple-600 py-4 rounded-xl text-white font-semibold hover:bg-purple-700"
        >
          Login
        </button>

        <p className="text-center text-gray-400 mt-8">

          Don't have an account?

          <Link
            to="/register"
            className="text-purple-400 ml-2"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;