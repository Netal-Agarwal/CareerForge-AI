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

            const data = await getATSScore(jobDescription);

            console.log(data);

            setResult(data);

        }

        catch (error) {

            console.log(error);

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

                placeholder="Paste Job Description..."

                className="w-full mt-8 bg-slate-800 rounded-xl p-5"

            />

            <button

                onClick={analyzeATS}

                className="mt-6 bg-purple-600 px-8 py-4 rounded-xl"

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

                        <p className="text-6xl mt-6">

                            {result.ats_score}

                        </p>

                    </div>

                )

            }

            {
              result && (

                  <div className="mt-8 bg-slate-800 rounded-xl p-8">

                    <h2 className="text-2xl font-bold text-green-400">

                      Matched Keywords

                    </h2>

                    <ul className="mt-6 space-y-3">

                      {result.matched_keywords.map((skill) => (

                        <li
                          key={skill}
                          className="bg-green-900 rounded-lg p-3"
                        >

                          {skill}

                        </li>

                      ))}

                    </ul>

                  </div>

              )
            }

            {
              result && (

                <div className="mt-8 bg-slate-800 rounded-xl p-8">

                  <h2 className="text-2xl font-bold text-red-400">

                    Missing Keywords

                  </h2>

                  <ul className="mt-6 space-y-3">

                    {result.missing_keywords.map((skill) => (

                      <li
                          key={skill}
                          className="bg-red-900 rounded-lg p-3"
                      >

                          {skill}

                      </li>

                    ))}

                  </ul>

                </div>

              )
            }


        </div>

    );

}

export default ATSScore;


