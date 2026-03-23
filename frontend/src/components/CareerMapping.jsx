import React from "react";
import { getCareerResult } from "../store/resultStore";
import { careerPaths } from "../data/careerPaths";

function CareerMapping() {

  const result = getCareerResult();

  if (!result) {
    return (
      <div className="p-10">
        <h2 className="text-2xl font-semibold">
          Please complete the Aptitude Test first.
        </h2>
      </div>
    );
  }

  const career = result.recommended_career;

  return (

    <div className="p-10 w-full">

      <h1 className="text-3xl font-bold mb-6">
        Career Mapping Result
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-6">

        <h2 className="text-xl font-semibold mb-3">
          Recommended Career: {career}
        </h2>

        <p className="text-gray-700 mb-5">
          {result.ai_explanation}
        </p>

        <h3 className="font-semibold text-lg mb-3">
          Subject Scores
        </h3>

        <div className="bg-gray-100 p-4 rounded mb-6">

          {Object.entries(result.scores).map(([subject, score]) => (

            <div key={subject} className="flex justify-between mb-2">

              <span className="capitalize">{subject}</span>
              <span className="font-semibold">{score}</span>

            </div>

          ))}

        </div>


        <h3 className="font-semibold text-lg mb-3">
          Suggested Career Paths
        </h3>

        <div className="grid grid-cols-2 gap-3">

          {careerPaths[career]?.careers.map((c, i) => (

            <div
              key={i}
              className="bg-blue-50 p-3 rounded-lg"
            >
              {c}
            </div>

          ))}

        </div>

      </div>

    </div>

  );
}

export default CareerMapping;
