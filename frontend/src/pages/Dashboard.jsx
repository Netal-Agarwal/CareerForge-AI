import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";

const quickLinks = [
  { to: "/resume-upload", label: "Upload Resume" },
  { to: "/resume-analysis", label: "Resume Analysis" },
  { to: "/ats-score", label: "ATS Score" },
  { to: "/career-readiness", label: "Career Readiness" },
  { to: "/skill-gap", label: "Skill Gap" },
  { to: "/roadmap", label: "Roadmap" },
  { to: "/interview-prep", label: "Interview Prep" },
  { to: "/executive-dashboard", label: "Executive Dashboard" },
  { to: "/profile", label: "Profile" },
];

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="mt-2 text-slate-400">
            Your career intelligence hub — pick a tool to get started.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Resume" value="Upload" subtitle="Analyze your PDF" />
          <StatCard title="ATS" value="Score" subtitle="Match job keywords" />
          <StatCard title="Skills" value="Gap" subtitle="Find what to learn" />
          <StatCard title="Interview" value="Prep" subtitle="Practice questions" />
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-white">Quick access</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-xl border border-slate-700/60 bg-slate-800/50 px-5 py-4 text-sm font-medium text-slate-200 transition hover:border-purple-500/60 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
