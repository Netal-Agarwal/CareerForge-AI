import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000";

function InterviewPrep() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/interview-questions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setData(response.data))
      .catch((err) => {
        setError(
          err.response?.data?.detail ||
            "Could not load questions. Upload a resume first.",
        );
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-3xl font-bold text-white">Interview Prep</h1>
        <p className="mt-2 text-slate-400">
          Skill-based interview questions generated from your resume.
        </p>

        {loading && (
          <p className="mt-8 text-slate-400">Loading questions...</p>
        )}

        {error && (
          <p className="mt-8 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </p>
        )}

        {data && (
          <div className="mt-8 space-y-8">
            {data.skills?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            <section className="space-y-4">
              {data.questions?.map((question, index) => (
                <div
                  key={`${question}-${index}`}
                  className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-5"
                >
                  <p className="text-xs font-medium uppercase tracking-wide text-purple-400">
                    Question {index + 1}
                  </p>
                  <p className="mt-2 text-sm text-slate-200">{question}</p>
                </div>
              ))}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

export default InterviewPrep;
