import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";
import DashboardPreview from "../components/DashboardPreview";

import {
    FaRobot,
    FaFileAlt,
    FaChartLine,
    FaGraduationCap,
    FaBriefcase,
    FaUserTie
} from "react-icons/fa";

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <Navbar />

      {/* Hero */}

      <section className="max-w-7xl mx-auto px-10 py-32">

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

            <button className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-xl font-semibold shadow-lg shadow-purple-600/30 transition">
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

      {/* Features */}

      <section className="max-w-7xl mx-auto py-24 px-8">

        <h2 className="text-5xl font-bold text-center mb-5">

          Why Choose

          <span className="text-purple-500">
            {" "}CareerForge AI?
          </span>

        </h2>

        <p className="text-center text-gray-400 mb-16">

          Everything you need to prepare for placements,
          internships and professional careers.

        </p>

        <div className="grid grid-cols-3 gap-8">

          <FeatureCard
            icon={<FaFileAlt />}
            title="Resume Analysis"
            description="Analyze resumes and identify missing skills."
          />

          <FeatureCard
            icon={<FaChartLine />}
            title="ATS Optimization"
            description="Improve ATS compatibility using intelligent recommendations."
          />

          <FeatureCard
            icon={<FaRobot />}
            title="AI Career Coach"
            description="Receive personalized career guidance powered by AI."
          />

          <FeatureCard
            icon={<FaGraduationCap />}
            title="Learning Roadmaps"
            description="Get structured 30/60/90 day learning plans."
          />

          <FeatureCard
            icon={<FaBriefcase />}
            title="Job Readiness"
            description="Measure your career readiness using multiple metrics."
          />

          <FeatureCard
            icon={<FaUserTie />}
            title="Interview Preparation"
            description="Practice interview questions based on your skills."
          />

        </div>

      </section>

      <section className="max-w-6xl mx-auto px-8 pb-24">
        <DashboardPreview />
      </section>


      <section className="max-w-6xl mx-auto py-24">

        <div className="bg-gradient-to-r from-purple-700 to-purple-500 rounded-3xl p-16 text-center">

          <h2 className="text-5xl font-bold">
            Ready to Forge Your Future?
          </h2>

          <p className="mt-6 text-lg text-purple-100">

            Upload your resume and receive AI-powered career insights in seconds.

          </p>

          <button className="mt-10 bg-white text-purple-700 px-10 py-4 rounded-xl font-semibold hover:bg-gray-200 transition">

            Start Free Analysis

          </button>

        </div>

      </section>

    </div>
  );
}

export default Landing;