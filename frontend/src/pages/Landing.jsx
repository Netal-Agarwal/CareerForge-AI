import { Link } from "react-router-dom";

function Landing() {
  const features = [
    {
      title: "Resume Intelligence",
      description: "Upload your resume and extract skills automatically from PDF.",
    },
    {
      title: "ATS Optimization",
      description: "Compare your profile against job descriptions and improve keyword match.",
    },
    {
      title: "Career Roadmap",
      description: "Get prioritized skill gaps and a personalized learning path.",
    },
    {
      title: "Interview Prep",
      description: "Practice with skill-based interview questions tailored to your resume.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <h1 className="text-2xl font-bold text-purple-400">CareerForge AI</h1>
        <div className="flex gap-3">
          <Link
            to="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 hover:text-white"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-500"
          >
            Get started
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16">
        <section className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-purple-400">
            AI Career Intelligence Platform
          </p>
          <h2 className="mt-4 text-5xl font-bold leading-tight">
            Forge your career with AI-powered insights
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Analyze resumes, measure ATS readiness, close skill gaps, and prepare
            for interviews — all in one dashboard.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/register"
              className="rounded-xl bg-purple-600 px-8 py-3 font-semibold hover:bg-purple-500"
            >
              Start for free
            </Link>
            <Link
              to="/login"
              className="rounded-xl border border-slate-600 px-8 py-3 font-semibold text-slate-200 hover:border-purple-500"
            >
              Sign in
            </Link>
          </div>
        </section>

        <section className="mt-24 grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-6"
            >
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{feature.description}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Landing;
