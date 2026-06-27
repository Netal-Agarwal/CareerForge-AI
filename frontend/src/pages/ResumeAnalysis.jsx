import { useEffect, useState } from "react";
import axios from "axios";
import SkillCard from "../components/SkillCard";
import StatCard from "../components/StatCard";

const API_URL = "http://localhost:8000";

function ResumeAnalysis() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/analyze-resume`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setData(response.data))
      .catch((err) => {
        setError(
          err.response?.data?.detail ||
            "Could not analyze resume. Upload one first.",
        );
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-bold text-white">Resume Analysis</h1>
        <p className="mt-2 text-slate-400">
          Skills extracted from your resume compared against career requirements.
        </p>

        {loading && <p className="mt-8 text-slate-400">Analyzing resume...</p>}

        {error && (
          <p className="mt-8 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </p>
        )}

        {data && (
          <>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <StatCard
                title="Existing Skills"
                value={data.existing_skills?.length ?? 0}
              />
              <StatCard
                title="Missing Skills"
                value={data.missing_skills?.length ?? 0}
              />
            </div>

            <section className="mt-10">
              <h2 className="mb-4 text-lg font-semibold text-white">
                Existing skills
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.existing_skills?.map((skill) => (
                  <SkillCard key={skill} name={skill} status="matched" />
                ))}
              </div>
            </section>

            <section className="mt-10">
              <h2 className="mb-4 text-lg font-semibold text-white">
                Missing skills
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.missing_skills?.map((skill) => (
                  <SkillCard key={skill} name={skill} status="missing" />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default ResumeAnalysis;
