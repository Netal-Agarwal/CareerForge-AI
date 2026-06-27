import { useEffect, useState } from "react";
import axios from "axios";
import SkillCard from "../components/SkillCard";
import StatCard from "../components/StatCard";

const API_URL = "http://localhost:8000";

const CAREER_TRACKS = [
  { value: "backend_developer", label: "Backend Developer" },
  { value: "data_scientist", label: "Data Scientist" },
  { value: "devops_engineer", label: "DevOps Engineer" },
  { value: "fullstack_developer", label: "Full Stack Developer" },
];

function SkillGap() {
  const [careerTrack, setCareerTrack] = useState("backend_developer");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError("");

    axios
      .get(`${API_URL}/skill-gap-priority`, {
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
            "Could not load skill gaps. Upload a resume first.",
        );
      })
      .finally(() => setLoading(false));
  }, [careerTrack]);

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-3xl font-bold text-white">Skill Gap Analysis</h1>
        <p className="mt-2 text-slate-400">
          Prioritized missing skills ranked by career impact.
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

        {loading && <p className="mt-8 text-slate-400">Loading skill gaps...</p>}

        {error && (
          <p className="mt-8 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </p>
        )}

        {data && (
          <div className="mt-8 space-y-8">
            {data.next_skill_to_learn && (
              <StatCard
                title="Next Skill to Learn"
                value={data.next_skill_to_learn}
                subtitle="Highest priority based on your career track"
              />
            )}

            <section>
              <h2 className="mb-4 text-lg font-semibold text-white">
                Priority skills
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {data.priority_skills?.map((item) => (
                  <SkillCard
                    key={item.skill}
                    name={item.skill}
                    status="missing"
                    description={`Impact score: ${item.impact_score}`}
                  />
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

export default SkillGap;
