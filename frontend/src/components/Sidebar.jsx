import {
    FaHome,
    FaFileAlt,
    FaChartLine,
    FaRoad,
    FaUserTie,
    FaSignOutAlt,
  } from "react-icons/fa";
  
  function Sidebar() {
    return (
      <aside className="w-72 bg-slate-950 border-r border-slate-800 min-h-screen p-8">
  
        <h1 className="text-3xl font-bold text-purple-500">
          CareerForge AI
        </h1>
  
        <p className="text-gray-500 text-sm mt-2">
          Career Intelligence Platform
        </p>
  
        <nav className="mt-12">
  
          <Menu icon={<FaHome />} text="Dashboard" active />
  
          <Menu icon={<FaFileAlt />} text="Resume Analysis" />
  
          <Menu icon={<FaChartLine />} text="ATS Score" />
  
          <Menu icon={<FaRoad />} text="Roadmap" />
  
          <Menu icon={<FaUserTie />} text="Interview Prep" />
  
        </nav>
  
        <div className="absolute bottom-10">
  
          <button className="flex items-center gap-3 text-gray-400 hover:text-white">
  
            <FaSignOutAlt />
  
            Logout
  
          </button>
  
        </div>
  
      </aside>
    );
  }
  
  function Menu({ icon, text, active }) {
    return (
      <div
        className={`flex items-center gap-4 mt-5 px-5 py-4 rounded-xl cursor-pointer transition
  
        ${
          active
            ? "bg-purple-600 text-white"
            : "text-gray-400 hover:bg-slate-800"
        }`}
      >
        {icon}
  
        <span>{text}</span>
      </div>
    );
  }
  
  export default Sidebar;