function DashboardPreview() {
    return (
      <div className="bg-slate-800 rounded-3xl border border-slate-700 p-8 shadow-2xl">
  
        <div className="grid grid-cols-3 gap-6">
  
          <div className="bg-slate-900 rounded-xl p-6">
            <h3 className="text-gray-400">Career Readiness</h3>
  
            <p className="text-5xl text-purple-500 font-bold mt-6">
              84
            </p>
  
            <p className="text-green-400 mt-4">
              +12%
            </p>
          </div>
  
          <div className="bg-slate-900 rounded-xl p-6">
            <h3 className="text-gray-400">
              ATS Score
            </h3>
  
            <p className="text-5xl text-purple-500 font-bold mt-6">
              91
            </p>
  
            <p className="text-green-400 mt-4">
              Excellent
            </p>
          </div>
  
          <div className="bg-slate-900 rounded-xl p-6">
            <h3 className="text-gray-400">
              Resume Score
            </h3>
  
            <p className="text-5xl text-purple-500 font-bold mt-6">
              87
            </p>
  
            <p className="text-green-400 mt-4">
              Improved
            </p>
          </div>
  
        </div>
  
        <div className="mt-8 bg-slate-900 rounded-xl p-6">
  
          <h2 className="text-xl font-semibold mb-5">
            AI Recommendations
          </h2>
  
          <div className="space-y-4">
  
            <div className="flex justify-between">
              <span>Learn Docker</span>
              <span className="text-purple-400">Priority High</span>
            </div>
  
            <div className="flex justify-between">
              <span>Improve PostgreSQL</span>
              <span className="text-purple-400">Priority Medium</span>
            </div>
  
            <div className="flex justify-between">
              <span>Practice System Design</span>
              <span className="text-purple-400">Priority High</span>
            </div>
  
          </div>
  
        </div>
  
      </div>
    );
  }
  
  export default DashboardPreview;


  