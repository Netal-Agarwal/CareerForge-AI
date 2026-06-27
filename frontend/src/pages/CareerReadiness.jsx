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

function CareerReadiness() {
  const [careerTrack, setCareerTrack] = useState("backend_developer");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError("");

    axios
      .get(`${API_URL}/career-readiness`, {
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
            "Could not load career readiness. Upload a resume first.",
        );
      })
      .finally(() => setLoading(false));
  }, [careerTrack]);

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-3xl font-bold text-white">Career Readiness</h1>
        <p className="mt-2 text-slate-400">
          Combined score based on resume quality, ATS fit, and skill proficiency.
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
          <p className="mt-8 text-slate-400">Loading readiness score...</p>
        )}

        {error && (
          <p className="mt-8 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </p>
        )}

        {data && (
          <div className="mt-8 space-y-6">
            <ProgressCard
              label="Career Readiness"
              value={data.career_readiness_score}
              color="purple"
              description={data.readiness_level}
            />

            <div className="grid gap-6 sm:grid-cols-3">
              <StatCard title="Resume Score" value={`${data.resume_score}%`} />
              <StatCard title="ATS Score" value={`${data.ats_score}%`} />
              <StatCard
                title="Proficiency Bonus"
                value={`+${data.proficiency_bonus}`}
              />
            </div>

            {data.advice && (
              <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-5">
                <h2 className="text-lg font-semibold text-white">Advice</h2>
                <p className="mt-2 text-sm text-slate-400">{data.advice}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CareerReadiness;
