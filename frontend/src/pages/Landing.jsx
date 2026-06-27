import Navbar from "../components/Navbar";

function Landing() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />

      {/* Hero */}

      <section className="max-w-7xl mx-auto px-10 py-24">

        <div className="text-center">

          <p className="text-purple-400 font-medium mb-4">
            AI Powered Career Intelligence
          </p>

          <h1 className="text-6xl font-bold leading-tight">

            Engineer Your

            <span className="text-purple-500">
              {" "}Professional Future
            </span>

          </h1>

          <p className="text-gray-400 mt-8 max-w-3xl mx-auto text-lg">

            Analyze your resume, measure ATS compatibility,
            identify skill gaps and receive an AI-powered
            roadmap to land your dream job.

          </p>

          <div className="mt-10 flex justify-center gap-5">

            <button className="bg-purple-600 px-8 py-4 rounded-xl hover:bg-purple-700 transition">
              Get Started
            </button>

            <button className="border border-gray-600 px-8 py-4 rounded-xl hover:bg-slate-800 transition">
              View Demo
            </button>

          </div>

        </div>

      </section>

      {/* Statistics */}

      <section className="max-w-6xl mx-auto grid grid-cols-4 gap-8 pb-20">

        <div className="text-center">
          <h2 className="text-4xl font-bold text-purple-400">500+</h2>
          <p className="text-gray-400">Resumes Analysed</p>
        </div>

        <div className="text-center">
          <h2 className="text-4xl font-bold text-purple-400">1000+</h2>
          <p className="text-gray-400">Skills Evaluated</p>
        </div>

        <div className="text-center">
          <h2 className="text-4xl font-bold text-purple-400">45+</h2>
          <p className="text-gray-400">Industries Covered</p>
        </div>

        <div className="text-center">
          <h2 className="text-4xl font-bold text-purple-400">24/7</h2>
          <p className="text-gray-400">AI Guidance</p>
        </div>

      </section>

    </div>
  );
}

export default Landing;