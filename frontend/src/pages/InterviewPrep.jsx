import { useEffect, useState } from "react";
import { getInterviewQuestions } from "../services/interviewService";

function InterviewPrep() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openAnswer, setOpenAnswer] = useState(null);
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

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

  function toggleCompleted(index) {

    if (completedQuestions.includes(index)) {

      setCompletedQuestions(

        completedQuestions.filter(

          (item) => item !== index

        )

      );

    }

    else {

      setCompletedQuestions([

        ...completedQuestions,

        index

      ]);

    }

  }

  function nextQuestion() {

    if (

      currentQuestion <

      data.questions.length - 1

    ) {

      setCurrentQuestion(

        currentQuestion + 1

      );

      setOpenAnswer(null);

    }

  }

  function previousQuestion() {

    if (

      currentQuestion > 0

    ) {

      setCurrentQuestion(

        currentQuestion - 1

      );

      setOpenAnswer(null);

    }

  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex justify-center items-center text-3xl">
        Loading Interview Questions...
      </div>
    );
  }

  const totalQuestions = data?.questions?.length || 0;
  const completedCount = completedQuestions.length;
  const progress =
    totalQuestions > 0
      ? Math.round(
        (completedCount / totalQuestions) * 100
      )
      : 0;

  const question =

    data?.questions?.[currentQuestion];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10">

      {/* Header */}

      <h1 className="text-5xl font-bold">
        AI Interview Preparation
      </h1>

      <p className="text-gray-400 mt-3">
        Personalized interview questions based on your uploaded resume.
      </p>

      <div className="mt-8 bg-slate-800 rounded-2xl p-6">

        <div className="flex justify-between">

          <h2 className="text-2xl font-bold">

            Interview Progress

          </h2>

          <span className="text-purple-400 text-xl font-bold">

            {progress}%

          </span>

        </div>

        <div className="w-full bg-slate-700 rounded-full h-4 mt-5">

          <div

            className="bg-purple-600 h-4 rounded-full transition-all duration-500"

            style={{

              width: `${progress}%`

            }}

          ></div>

        </div>

        <p className="mt-4 text-gray-400">

          {completedCount} / {totalQuestions} Questions Completed

        </p>

      </div>

      {/* Skills */}

      <div className="mt-10">

        <h2 className="text-2xl font-bold">
          Skills Detected
        </h2>

        <div className="flex flex-wrap gap-3 mt-5">

          <div className="bg-slate-800 rounded-2xl p-8">

            <h3 className="text-2xl font-bold">

              Question {currentQuestion + 1}

              {" / "}

              {totalQuestions}

            </h3>

            <p className="mt-6 text-2xl">

              {question?.question}

            </p>

            <span className="inline-block mt-6 bg-green-600 px-5 py-2 rounded-full">

              {question?.difficulty}

            </span>

            <div className="mt-8 flex gap-4">

              <button

                onClick={() =>

                  setOpenAnswer(

                    !openAnswer

                  )

                }

                className="bg-purple-600 px-6 py-3 rounded-xl"

              >

                {openAnswer

                  ?

                  "Hide Answer"

                  :

                  "Show Answer"}

              </button>

              <button

                onClick={() =>

                  toggleCompleted(

                    currentQuestion

                  )

                }

                className={`px-6 py-3 rounded-xl

            ${completedQuestions.includes(

                  currentQuestion

                )

                    ?

                    "bg-green-600"

                    :

                    "bg-slate-700"

                  }`}

              >

                {

                  completedQuestions.includes(

                    currentQuestion

                  )

                    ?

                    "✓ Completed"

                    :

                    "Mark Completed"

                }

              </button>

            </div>

            {openAnswer && (

              <div className="mt-8 bg-slate-900 rounded-xl p-6">

                <h4 className="text-xl font-bold text-purple-400">

                  Model Answer

                </h4>

                <p className="mt-4 leading-8">

                  {question?.answer}

                </p>

              </div>

            )}

            <div className="flex justify-between mt-10">

              <button

                onClick={previousQuestion}

                disabled={currentQuestion === 0}

                className="bg-slate-700 px-6 py-3 rounded-xl"

              >

                Previous

              </button>

              <button

                onClick={nextQuestion}

                disabled={

                  currentQuestion ===

                  totalQuestions - 1

                }

                className="bg-purple-600 px-6 py-3 rounded-xl"

              >

                Next

              </button>

            </div>

          </div>

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

              <button
                onClick={() => toggleCompleted(index)}
                className={`mt-4 ml-4 px-5 py-3 rounded-xl font-semibold transition ${completedQuestions.includes(index)
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-slate-700 hover:bg-slate-600"
                  }`}
              >
                {completedQuestions.includes(index)
                  ? "✓ Completed"
                  : "Mark as Completed"}
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