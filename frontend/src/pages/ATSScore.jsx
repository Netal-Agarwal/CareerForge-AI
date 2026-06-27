import { useState } from "react";
import axios from "axios";
import ProgressCard from "../components/ProgressCard";
import SkillCard from "../components/SkillCard";

const API_URL = "http://localhost:8000";

function ATSScore() {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post(
        `${API_URL}/ats-score`,
        null,
        {
          params: { job_description: jobDescription },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setResult(response.data);
    } catch (err) {
      setError(
        err.response?.data?.detail || "ATS scoring failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-3xl font-bold text-white">ATS Score</h1>
        <p className="mt-2 text-slate-400">
          Paste a job description to see how well your resume matches it.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <textarea
            value={jobDescription}
            onChange={(event) => setJobDescription(event.target.value)}
            required
            rows={8}
            placeholder="Paste the job description here..."
            className="w-full rounded-xl border border-slate-600 bg-slate-800/50 px-4 py-3 text-white outline-none focus:border-purple-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-500 disabled:opacity-60"
          >
            {loading ? "Calculating..." : "Calculate ATS Score"}
          </button>
        </form>

        {error && (
          <p className="mt-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </p>
        )}

        {result && (
          <div className="mt-8 space-y-8">
            <ProgressCard
              label="ATS Score"
              value={result.ats_score}
              color="emerald"
              description="Keyword match against the job description"
            />

            <section>
              <h2 className="mb-4 text-lg font-semibold text-white">
                Matched keywords
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {result.matched_keywords?.map((keyword) => (
                  <SkillCard key={keyword} name={keyword} status="matched" />
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold text-white">
                Missing keywords
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {result.missing_keywords?.map((keyword) => (
                  <SkillCard key={keyword} name={keyword} status="missing" />
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

export default ATSScore;
