import { useEffect, useState } from "react";
import { getInterviewQuestions } from "../services/interviewService";

function InterviewPrep() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadQuestions() {

      try {

        const response = await getInterviewQuestions();

        console.log(response);

        setData(response);

      }

      catch (error) {

        console.log(error);

      }

      finally {

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

              className="bg-purple-600 px-5 py-2 rounded-full"

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

              className="bg-slate-800 rounded-2xl p-6"

            >

              <h3 className="text-xl font-semibold">

                Question {index + 1}

              </h3>

              <p className="mt-4 text-lg">

                {item.question}

              </p>

              <span className="inline-block mt-5 bg-green-600 px-4 py-2 rounded-full">

                {item.difficulty}

              </span>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default InterviewPrep;