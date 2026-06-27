import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000";

const emptyProfile = {
  full_name: "",
  college: "",
  degree: "",
  graduation_year: "",
  skills: "",
};

function Profile() {
  const [form, setForm] = useState(emptyProfile);
  const [exists, setExists] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/profile`, { headers: authHeaders() })
      .then((response) => {
        setForm({
          ...response.data,
          graduation_year: String(response.data.graduation_year),
        });
        setExists(true);
      })
      .catch(() => {
        setExists(false);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    setSaving(true);

    const payload = {
      ...form,
      graduation_year: Number(form.graduation_year),
    };

    try {
      if (exists) {
        await axios.put(`${API_URL}/profile`, payload, {
          headers: authHeaders(),
        });
        setMessage("Profile updated successfully.");
      } else {
        await axios.post(`${API_URL}/profile`, payload, {
          headers: authHeaders(),
        });
        setExists(true);
        setMessage("Profile created successfully.");
      }
    } catch (err) {
      setError(
        err.response?.data?.detail || "Could not save profile. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="text-3xl font-bold text-white">Profile</h1>
        <p className="mt-2 text-slate-400">
          Manage your personal and academic details.
        </p>

        {loading ? (
          <p className="mt-8 text-slate-400">Loading profile...</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Full name
              </label>
              <input
                type="text"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3 text-white outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                College
              </label>
              <input
                type="text"
                name="college"
                value={form.college}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3 text-white outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Degree
              </label>
              <input
                type="text"
                name="degree"
                value={form.degree}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3 text-white outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Graduation year
              </label>
              <input
                type="number"
                name="graduation_year"
                value={form.graduation_year}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3 text-white outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Skills
              </label>
              <textarea
                name="skills"
                value={form.skills}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Python, React, PostgreSQL..."
                className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3 text-white outline-none focus:border-purple-500"
              />
            </div>

            {message && (
              <p className="rounded-lg bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
                {message}
              </p>
            )}

            {error && (
              <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-500 disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : exists
                  ? "Update profile"
                  : "Create profile"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;
