import { useEffect, useState } from "react";
import axios from "axios";
import ProgressCard from "../components/ProgressCard";
import StatCard from "../components/StatCard";

const API_URL = "http://localhost:8000";

const CAREER_TRACKS = [
  { value: "backend_developer", label: "Backend Developer" },
  { value: "data_scientist", label: "Data Scientist" },
  { value: "devops_engineer", label: "DevOps Engineer" },
  { value: "fullstack_developer", label: "Full Stack Developer" },
];

function ExecutiveDashboard() {
  const [careerTrack, setCareerTrack] = useState("backend_developer");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError("");

    axios
      .get(`${API_URL}/executive-dashboard`, {
        params: { career_track: careerTrack },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setData(response.data))
      .catch((err) => {
        setData(null);
        setError(
          err.response?.data?.detail ||
            "Could not load dashboard. Upload a resume first.",
        );
      })
      .finally(() => setLoading(false));
  }, [careerTrack]);

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-bold text-white">Executive Dashboard</h1>
        <p className="mt-2 text-slate-400">
          High-level career intelligence at a glance.
        </p>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Career track
          </label>
          <select
            value={careerTrack}
            onChange={(event) => setCareerTrack(event.target.value)}
            className="rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white outline-none focus:border-purple-500"
          >
            {CAREER_TRACKS.map((track) => (
              <option key={track.value} value={track.value}>
                {track.label}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <p className="mt-8 text-slate-400">Loading executive summary...</p>
        )}

        {error && (
          <p className="mt-8 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </p>
        )}

        {data && (
          <div className="mt-8 space-y-8">
            {data.executive_summary && (
              <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-6">
                <h2 className="text-lg font-semibold text-white">
                  Executive Summary
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {data.executive_summary}
                </p>
              </div>
            )}

            <ProgressCard
              label="Career Readiness"
              value={data.career_readiness_score}
              color="purple"
            />

            <div className="grid gap-6 sm:grid-cols-3">
              <StatCard title="Resume Score" value={`${data.resume_score}%`} />
              <StatCard title="ATS Score" value={`${data.ats_score}%`} />
              <StatCard
                title="Next Skill"
                value={data.next_skill_to_learn || "None"}
              />
            </div>

            {data.priority_skills?.length > 0 && (
              <section>
                <h2 className="mb-4 text-lg font-semibold text-white">
                  Priority skills
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {data.priority_skills.map((item) => (
                    <div
                      key={item.skill}
                      className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-4"
                    >
                      <p className="font-semibold text-white">{item.skill}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        Impact: {item.impact_score}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.interview_questions?.length > 0 && (
              <section>
                <h2 className="mb-4 text-lg font-semibold text-white">
                  Sample interview questions
                </h2>
                <div className="space-y-3">
                  {data.interview_questions.slice(0, 3).map((question, index) => (
                    <p
                      key={`${question}-${index}`}
                      className="rounded-lg border border-slate-700/60 bg-slate-800/50 px-4 py-3 text-sm text-slate-300"
                    >
                      {question}
                    </p>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ExecutiveDashboard;
