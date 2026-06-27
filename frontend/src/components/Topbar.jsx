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
  
        <button className="bg-purple-600 px-6 py-3 rounded-xl hover:bg-purple-700">
  
          Upload Resume
  
        </button>
  
      </header>
    );
  }
  
  export default Topbar;