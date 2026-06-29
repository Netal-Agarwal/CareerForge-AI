import { useState } from "react";

import { getATSScore } from "../services/atsService";

function ATSScore() {

    const [jobDescription, setJobDescription] = useState("");

    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);

    const analyzeATS = async () => {

        if (!jobDescription.trim()) {

            alert("Please enter a Job Description.");

            return;

        }

        setLoading(true);

        try {

            console.log("Button clicked");
            console.log(jobDescription);
            const data = await getATSScore(jobDescription);

            console.log("Response:", data);
            setResult(data);

        }

        catch (error) {

          console.log(error);
      
          if (error.response) {
      
              console.log("STATUS:", error.response.status);
              console.log("DATA:", error.response.data);
      
          } else {
      
              console.log(error.message);
      
          }
      
          alert("Failed to analyze ATS.");
      }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-slate-900 text-white p-10">

            <h1 className="text-4xl font-bold">

                ATS Score Analyzer

            </h1>

            <textarea

                value={jobDescription}

                onChange={(e)=>setJobDescription(e.target.value)}

                rows={12}

                placeholder="Paste the complete job description here to analyze ATS compatibility..."

                className="w-full mt-8 bg-slate-800 rounded-xl p-5"

            />

            <button

                disabled={loading}

                onClick={analyzeATS}

                className="mt-6 bg-purple-600 px-8 py-4 rounded-xl hover:bg-purple-700 disabled:opacity-50"

            >

                {

                    loading

                    ?

                    "Analyzing..."

                    :

                    "Analyze ATS"

                }

            </button>

            {

                result && (

                    <div className="mt-10 bg-slate-800 rounded-xl p-8">

                        <h2 className="text-3xl font-bold">

                            ATS Score

                        </h2>

                        <p
                          className={`text-6xl mt-6 font-bold

                          ${
                            result.ats_score >= 80

                            ? "text-green-400"

                            : result.ats_score >= 60

                            ? "text-yellow-400"

                            : "text-red-400"
                          }`}
                        >

                            {result.ats_score}/100

                        </p>

                        <div className="w-full bg-slate-700 rounded-full h-4 mt-8">

                          <div

                            className="bg-purple-600 h-4 rounded-full transition-all duration-700"

                            style={{

                              width: `${result.ats_score}%`

                            }}

                          ></div>

                        </div>

                    </div>

                )

            }

            {
              result && (

                <>

                <div className="grid grid-cols-2 gap-8 mt-8">

                  <div className="mt-8 bg-slate-800 rounded-xl p-8">

                    <h2 className="text-2xl font-bold text-green-400">

                      Matched Keywords

                    </h2>

                    <ul className="mt-6 space-y-3">

                      {result.matched_keywords.map((skill) => (

                         <li

                            key={skill}

                            className="flex items-center bg-green-900 rounded-xl px-4 py-3"

                          >

                            <span className="mr-3">

                                ✅  

                            </span>

                            {skill}

                        </li>

                      ))}

                    </ul>

                  </div>

                  <div className="bg-slate-800 rounded-xl p-8">

                    <h2 className="text-2xl font-bold text-red-400">

                        Missing Keywords

                    </h2>

                    <ul className="mt-6 space-y-3">

                        {result.missing_keywords.map((skill) => (

                          <li

                            key={skill}

                            className="flex items-center bg-green-900 rounded-xl px-4 py-3"

                          >

                            <span className="mr-3">

                               ❌

                            </span>

                            {skill}

                          </li>

                        ))}

                    </ul>

                  </div>
                </div>

                <div className="mt-8 bg-slate-800 rounded-xl p-8">

                        <h2 className="text-2xl font-bold">
                           ATS Recommendation
                        </h2>

                        <p className="text-gray-300 mt-5">
                             Improve the missing keywords in your resume to increase your ATS score.
                        </p>

                </div>
              </>
                      )}

        </div>

    );

  }

export default ATSScore;


