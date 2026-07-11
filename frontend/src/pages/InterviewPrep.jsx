import { useEffect, useState } from "react";
import { getInterviewQuestions } from "../services/interviewService";

function InterviewPrep() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openAnswer, setOpenAnswer] = useState(null);

  useEffect(() => {
    async function loadQuestions() {
      try {
        const response = await getInterviewQuestions();

        console.log(response);

        setData(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadQuestions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex justify-center items-center text-3xl">
        Loading Interview Questions...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10">

      {/* Header */}

      <h1 className="text-5xl font-bold">
        AI Interview Preparation
      </h1>

      <p className="text-gray-400 mt-3">
        Personalized interview questions based on your uploaded resume.
      </p>

      {/* Skills */}

      <div className="mt-10">

        <h2 className="text-2xl font-bold">
          Skills Detected
        </h2>

        <div className="flex flex-wrap gap-3 mt-5">

          {data?.skills?.map((skill) => (

            <span
              key={skill}
              className="bg-purple-600 hover:bg-purple-700 transition px-5 py-2 rounded-full text-white font-medium"
            >
              {skill}
            </span>

          ))}

        </div>

      </div>

      {/* Questions */}

      <div className="mt-12">

        <h2 className="text-2xl font-bold">
          Interview Questions
        </h2>

        <div className="space-y-6 mt-6">

          {data?.questions?.map((item, index) => (

            <div
              key={index}
              className="bg-slate-800 rounded-2xl p-6 shadow-lg"
            >

              <div className="flex justify-between items-center">

                <h3 className="text-xl font-semibold">
                  Question {index + 1}
                </h3>

                <span
                  className={`px-4 py-2 rounded-full text-white font-medium ${item.difficulty === "Easy"
                      ? "bg-green-600"
                      : item.difficulty === "Medium"
                        ? "bg-yellow-500"
                        : "bg-red-600"
                    }`}
                >
                  {item.difficulty}
                </span>

              </div>

              <p className="mt-5 text-lg leading-8">
                {item.question}
              </p>

              <button
                onClick={() =>
                  setOpenAnswer(
                    openAnswer === index ? null : index
                  )
                }
                className="mt-6 bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-xl font-semibold"
              >
                {openAnswer === index
                  ? "Hide Answer"
                  : "Show Answer"}
              </button>

              {openAnswer === index && (

                <div className="mt-6 bg-slate-900 border border-purple-600 rounded-xl p-6">

                  <h4 className="text-xl font-semibold text-purple-400">
                    Model Answer
                  </h4>

                  <p className="mt-4 text-gray-300 leading-8">
                    {item.answer}
                  </p>

                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default InterviewPrep;