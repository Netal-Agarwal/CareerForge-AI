import { useEffect, useState } from "react";
import axios from "axios";
import UploadBox from "../components/UploadBox";

const API_URL = "http://localhost:8000";

function ResumeUpload() {
  const [currentResume, setCurrentResume] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/resume`, { headers: authHeaders() })
      .then((response) => setCurrentResume(response.data))
      .catch(() => setCurrentResume(null));
  }, []);

  const handleUpload = async (file) => {
    setMessage("");
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${API_URL}/upload-resume`,
        formData,
        {
          headers: {
            ...authHeaders(),
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setMessage(response.data.message);
      setCurrentResume({ file_name: response.data.file_name });
    } catch (err) {
      setError(
        err.response?.data?.detail || "Upload failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-3xl font-bold text-white">Resume Upload</h1>
        <p className="mt-2 text-slate-400">
          Upload your PDF resume to unlock analysis and career insights.
        </p>

        {currentResume && (
          <p className="mt-6 rounded-lg border border-slate-700/60 bg-slate-800/50 px-4 py-3 text-sm text-slate-300">
            Current resume:{" "}
            <span className="font-medium text-white">
              {currentResume.file_name}
            </span>
          </p>
        )}

        <div className="mt-8">
          <UploadBox
            onFileSelect={handleUpload}
            disabled={loading}
            label={loading ? "Uploading..." : "Upload your resume"}
          />
        </div>

        {message && (
          <p className="mt-4 rounded-lg bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
            {message}
          </p>
        )}

        {error && (
          <p className="mt-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default ResumeUpload;
