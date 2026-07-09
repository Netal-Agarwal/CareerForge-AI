import { useEffect, useState } from "react";
import { getCareerReadiness } from "../services/careerReadinessService";

function CareerReadiness() {

    const [report, setReport] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

      async function loadReport() {
  
          try {
  
              const data = await getCareerReadiness(
                  "backend_developer"
              );
              
              console.log(data);
              
              setReport(data);
  
          }
  
          catch(error){
  
              console.log(error);
  
          }
  
          finally{
  
              setLoading(false);
  
          }
  
      }
  
      loadReport();
  
  }, []);

  if (loading) {

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white text-3xl">

            Loading Career Report...

        </div>

    );

}

return (

  <div className="min-h-screen bg-slate-900 text-white p-10">

      <h1 className="text-5xl font-bold mb-10">

          Career Readiness Report

      </h1>

      <div className="bg-slate-800 rounded-2xl p-8">

          <h2 className="text-2xl font-semibold text-gray-300">

              Overall Career Readiness

          </h2>

          <p className="text-6xl font-bold text-purple-400 mt-6">

              {report?.score}%

          </p>

          <p className="text-xl mt-4 text-gray-300">

              Grade : {report?.grade}

          </p>

          <div className="w-full bg-slate-700 rounded-full h-4 mt-8">

            <div

              className="bg-purple-600 h-4 rounded-full transition-all duration-700"

              style={{

                width: `${report?.score}%`

              }}

            ></div>

          </div>

      </div>

      <div className="bg-slate-800 rounded-2xl p-8 mt-8">

        <h2 className="text-2xl font-bold">

            Career Advice

        </h2>

        <p className="text-gray-300 mt-5">

            {report?.advice}

        </p>

      </div>

      <div className="bg-slate-800 rounded-2xl p-8 mt-8">

        <h2 className="text-2xl font-bold">

            Priority Skill Gaps

        </h2>

        <ul className="mt-6 space-y-3">

            {report?.priority_skill_gaps?.map((skill) => (

              <li
                key={skill}
                className="bg-slate-900 rounded-lg p-4"
              >

                {skill}

              </li>

            ))}

        </ul>

      </div>

        
  </div>

);

}

export default CareerReadiness;