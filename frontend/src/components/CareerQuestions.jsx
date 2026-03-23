// import React, { useState, useEffect } from "react";
// import { useAuth } from "@clerk/clerk-react";
// import { current_user } from "./authentication/Service";

// function CareerQuestions({ onselect }) {
//   const { getToken } = useAuth();
//   const [SubCategory, setSubCategory] = useState(false);
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [currentUser, setCurrentUser] = useState(null);
//   const [toast, setToast] = useState({ show: false, message: "", type: "" });

//   const components = {
//     all: [
//       {
//         category: "science",
//         title: "Math & Logic Skills",
//         description: "Test problem-solving and analytical thinking abilities.",
//       },
//       {
//         category: "science",
//         title: "Research & Curiosity",
//         description: "Gauge interest in exploration, experimentation, and discovery.",
//       },
//       {
//         category: "science",
//         title: "Technology Interest",
//         description: "Measure enthusiasm for computers, gadgets, and innovations.",
//       },
//       {
//         title: "Finance & Accounting",
//         description: "Assess knowledge of money management and accounting basics.",
//       },
//       {
//         title: "Business & Management",
//         description: "Check leadership, planning, and organizational skills.",
//       },
//       {
//         title: "Marketing & Sales",
//         description: "Evaluate persuasion, communication, and market strategy skills.",
//       },
//       {
//         title: "Creativity & Expression",
//         description: "Explore talent in art, writing, and creative thinking.",
//       },
//       {
//         title: "Communication & Language",
//         description: "Test fluency, vocabulary, and storytelling abilities.",
//       },
//       { title: "Performing Arts", description: "Identify interest in music, dance, or drama performance." },
//       { title: "Care & Compassion", description: "Understand empathy, patience, and supportiveness." },
//       { title: "Biology & Health", description: "Test knowledge and interest in life sciences and health." },
//       { title: "Practical Skills", description: "Evaluate hands-on skills for solving real-world problems." },
//       {
//         title: "Design & Visualization",
//         description: "Check creativity in planning, sketching, and structures.",
//       },
//       { title: "Math & Structures", description: "Assess numerical, geometric, and structural reasoning." },
//       {
//         title: "Environment & Aesthetics",
//         description: "Explore awareness of nature, beauty, and surroundings.",
//       },
//       {
//         title: "Patient Care & Empathy",
//         description: "Test ability to support and care for others in need.",
//       },
//       {
//         title: "Medical Knowledge Basics",
//         description: "Check understanding of basic anatomy and health sciences.",
//       },
//       {
//         title: "Teamwork & Discipline",
//         description: "Measure collaboration, discipline, and cooperative skills.",
//       },
//     ],

//     science: [
//       {
//         category: "science",
//         title: "General",
//         description: "Tell us about your intrest on science!",
//       },
//       {
//         category: "science",
//         title: "Math & Logic Skills",
//         description: "Test your analytical and numerical problem-solving ability.",
//       },
//       {
//         category: "science",
//         title: "Research & Curiosity",
//         description: "See how much you enjoy experimentation and exploration.",
//       },
//       {
//         category: "science",
//         title: "Technology Interest",
//         description: "Identify interest in computing, gadgets, and innovations.",
//       },
//     ],

//     commerce: [
//       {
//         category: "commerce",
//         title: "General",
//         description: "Tell us about your intrest on commerce!",
//       },
//       {
//         category: "commerce",
//         title: "Finance & Accounting",
//         description: "Evaluate money handling and accounting basics.",
//       },
//       {
//         category: "commerce",
//         title: "Business & Management",
//         description: "Check leadership and decision-making skills.",
//       },
//       {
//         category: "commerce",
//         title: "Marketing & Sales",
//         description: "Assess persuasion and market strategy understanding.",
//       },
//     ],

//     arts: [
//       {
//         category: "arts",
//         title: "General",
//         description: "Tell us about your intrest on Arts!",
//       },
//       {
//         category: "arts",
//         title: "Creativity & Expression",
//         description: "Explore imagination, art, and originality.",
//       },
//       {
//         title: "Communication & Language",
//         description: "Measure fluency and ability to express ideas clearly.",
//       },
//       { title: "Performing Arts", description: "Discover talent in music, dance, or stage performance." },
//     ],

//     medical: [
//       {
//         title: "General",
//         description: "Tell us about your intrest on medical!",
//       },
//       { title: "Care & Compassion", description: "Understand empathy and ability to help others." },
//       { title: "Biology & Health", description: "Test knowledge in life sciences and human biology." },
//       { title: "Practical Skills", description: "Evaluate hands-on skills for health-related tasks." },
//     ],

//     architecture: [
//       {
//         title: "General",
//         description: "Tell us about your intrest on architecture!",
//       },
//       { title: "Design & Visualization", description: "Check creativity in drawing and design." },
//       { title: "Math & Structures", description: "Assess geometric and structural reasoning." },
//       {
//         title: "Environment & Aesthetics",
//         description: "Explore awareness of natural and built surroundings.",
//       },
//     ],

//     nursing: [
//       {
//         title: "General",
//         description: "Tell us about your intrest on nursing!",
//       },
//       { title: "Patient Care & Empathy", description: "Test compassion and caregiving ability." },
//       { title: "Medical Knowledge Basics", description: "Check understanding of anatomy and patient care." },
//       { title: "Teamwork & Discipline", description: "Measure discipline and ability to work in teams." },
//     ],
//   };

//   useEffect(() => {
//     const getCurrentUser = async () => {
//       try {
//         const token = await getToken({ template: "myTokenTemplate" });
//         if (!token) return;
//         const data = await current_user(token);
//         setCurrentUser(data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getCurrentUser();
//   }, [getToken]);

//   console.log(questions);
//   const getQuestions = async (category, sub_category) => {
//     const subCategory = sub_category.toLowerCase();
//     const categoryLower = category.toLowerCase();
//     try {
//       const res = await fetch(
//         `http://127.0.0.1:8000/v1/aptitude/category-based/${categoryLower}/${subCategory}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!res.ok) {
//         throw new Error(`Error: ${res.status}`);
//       }

//       const data = await res.json();
//       setQuestions(data);
//       return data;
//     } catch (err) {
//       console.error("Failed to fetch questions:", err);
//       return null;
//     }
//   };

//   const handleOptionChange = (questionId, optionId) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [questionId]: optionId,
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       const res = await fetch("http://localhost:8000/v1/aptitude/submit-responses", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           user_id: currentUser?.id,
//           answers: Object.keys(answers).map((qid) => ({
//             question_id: Number(qid),
//             option_id: answers[qid],
//           })),
//         }),
//       });

//       const data = await res.json();
//       console.log("Submitted:", data);
//       setToast({ show: true, message: "Responses submitted successfully!", type: "success" });
//       setTimeout(() => setToast({ ...toast, show: false }), 3000);
//       setSubCategory(false);
//       setQuestions([]);
//       setAnswers({});
//     } catch (err) {
//       console.error("Error submitting responses:", err);
//       setToast({ show: true, message: "Failed to submit responses.", type: "error" });
//       setTimeout(() => setToast({ ...toast, show: false }), 3000);
//     }
//   };

//   const handleOverlayClick = (e) => {
//     if (e.target.id === "overlay") {
//       setQuestions([]);
//       setSubCategory(false);
//       setAnswers({});
//     }
//   };

//   return (
//     <div className="">
//       {onselect === "all" ? (
//         <div className="grid grid-cols-3 gap-4">
//           {components.all.map((subcard, idx) => (
//             <div
//               key={idx}
//               className="bg-white border flex flex-col items-start gap-3 border-gray-200 rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-xl transition duration-300 ease-in-out"
//             >
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">{subcard.title}</h3>
//               <p className="text-[13px] text-gray-600 mb-4">{subcard.description}</p>
//               <button className="text-blue-600 font-medium hover:underline">Explore →</button>
//             </div>
//           ))}
//         </div>
//       ) : onselect === "science" ? (
//         <div className="grid grid-cols-3 gap-4">
//           {components.science.map((subcard, idx) => (
//             <div
//               key={idx}
//               className="bg-white flex flex-col items-start border gap-3 border-gray-200 rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-xl transition duration-300 ease-in-out"
//             >
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">{subcard.title}</h3>
//               <p className="text-[13px] text-gray-600 mb-4">{subcard.description}</p>
//               <button
//   onClick={() => {
//     setSubCategory(true);
//     getQuestions(subcard.category || onselect, subcard.title);
//   }}
//   className="text-blue-600 font-medium hover:underline"
// >
//   Explore →
// </button>
//             </div>
//           ))}
//         </div>
//       ) : onselect === "arts" ? (
//         <div className="grid grid-cols-3 gap-4">
//           {components.arts.map((subcard, idx) => (
//             <div
//               key={idx}
//               className="bg-white flex flex-col items-start border gap-3 border-gray-200 rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-xl transition duration-300 ease-in-out"
//             >
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">{subcard.title}</h3>
//               <p className="text-[13px] text-gray-600 mb-4">{subcard.description}</p>
//               <button className="text-blue-600 font-medium hover:underline">Explore →</button>
//             </div>
//           ))}
//         </div>
//       ) : onselect === "architecture" ? (
//         <div className="grid grid-cols-3 gap-4">
//           {components.architecture.map((subcard, idx) => (
//             <div
//               key={idx}
//               className="bg-white flex flex-col items-start border gap-3 border-gray-200 rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-xl transition duration-300 ease-in-out"
//             >
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">{subcard.title}</h3>
//               <p className="text-[13px] text-gray-600 mb-4">{subcard.description}</p>
//               <button className="text-blue-600 font-medium hover:underline">Explore →</button>
//             </div>
//           ))}
//         </div>
//       ) : onselect === "commerce" ? (
//         <div className="grid grid-cols-3 gap-4">
//           {components.commerce.map((subcard, idx) => (
//             <div
//               key={idx}
//               className="bg-white flex flex-col items-start border gap-3 border-gray-200 rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-xl transition duration-300 ease-in-out"
//             >
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">{subcard.title}</h3>
//               <p className="text-[13px] text-gray-600 mb-4">{subcard.description}</p>
//               <button
//                 onClick={() => {
//                   setSubCategory(true);
//                   getQuestions("commerce", subcard.title);
//                 }}
//                 className="text-blue-600 font-medium hover:underline"
//               >
//                 Explore →
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : onselect === "medical" ? (
//         <div className="grid grid-cols-3 gap-4">
//           {components.medical.map((subcard, idx) => (
//             <div
//               key={idx}
//               className="bg-white flex flex-col items-start border gap-3 border-gray-200 rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-xl transition duration-300 ease-in-out"
//             >
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">{subcard.title}</h3>
//               <p className="text-[13px] text-gray-600 mb-4">{subcard.description}</p>
//               <button className="text-blue-600 font-medium hover:underline">Explore →</button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="grid grid-cols-3 gap-4">
//           {components.nursing.map((subcard, idx) => (
//             <div
//               key={idx}
//               className="bg-white flex flex-col items-start border gap-3 border-gray-200 rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-xl transition duration-300 ease-in-out"
//             >
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">{subcard.title}</h3>
//               <p className="text-[13px] text-gray-600 mb-4">{subcard.description}</p>
//               <button className="text-blue-600 font-medium hover:underline">Explore →</button>
//             </div>
//           ))}
//         </div>
//       )}

//       {SubCategory && (
//         <div
//           id="overlay"
//           onClick={handleOverlayClick}
//           className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
//         >
//           <div
//             onClick={(e) => e.stopPropagation()}
//             className="bg-white w-[70%] max-h-[85vh] overflow-y-auto rounded-2xl flex flex-col gap-4 items-start shadow-xl p-8 relative"
//           >
//             <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">📘 Aptitude Quiz</h2>

//             <div className="space-y-8  w-full flex flex-col gap-4">
//               {questions.map((q, index) => (
//                 <div
//                   key={q.id}
//                   className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition flex flex-col gap-4"
//                 >
//                   <div className="flex items-center justify-between mb-4">
//                     <p className="text-lg font-semibold text-gray-800">
//                       Q{index + 1}. {q.question_text}
//                     </p>
//                     <span className="text-sm text-gray-500">
//                       {index + 1} / {questions.length}
//                     </span>
//                   </div>

//                   <div className="space-y-3 flex flex-col gap-3">
//                     {q.options.map((opt) => (
//                       <label
//                         key={opt.id}
//                         className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition 
//                     ${
//                       answers[q.id] === opt.id
//                         ? "border-blue-500 bg-blue-50"
//                         : "border-gray-200 hover:border-blue-300"
//                     }`}
//                       >
//                         <input
//                           type="radio"
//                           name={`question-${q.id}`}
//                           value={opt.id}
//                           checked={answers[q.id] === opt.id}
//                           onChange={() => handleOptionChange(q.id, opt.id)}
//                           className="w-5 h-5 text-blue-600"
//                         />
//                         <span className="text-gray-700">{opt.option_text}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="flex justify-end gap-4 mt-8  pt-4">
//               <button
//                 onClick={() => setSubCategory(false)}
//                 className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 shadow"
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {toast.show && (
//         <div
//           className={`fixed bottom-5 right-5 px-4 py-2 rounded-md text-white shadow-lg transition-all duration-300 ${
//             toast.type === "success" ? "bg-green-500" : "bg-red-500"
//           }`}
//         >
//           {toast.message}
//         </div>
//       )}
//     </div>
//   );
// }

// export default CareerQuestions;
import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { current_user } from "./authentication/Service";

function CareerQuestions({ onselect, onTestComplete }) {

  const { getToken } = useAuth();

  const [SubCategory, setSubCategory] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [result, setResult] = useState(null);

  const streamComponents = {

    science: [
      { category: "science", title: "math_logic", label: "Math & Logic Skills" },
      { category: "science", title: "research_curiosity", label: "Research & Curiosity" },
      { category: "science", title: "technology_interest", label: "Technology Interest" }
    ],

    commerce: [
      { category: "commerce", title: "finance_accounting", label: "Finance & Accounting" },
      { category: "commerce", title: "business_management", label: "Business & Management" },
      { category: "commerce", title: "marketing_sales", label: "Marketing & Sales" }
    ],

    arts: [
      { category: "arts", title: "creativity_expression", label: "Creativity & Expression" },
      { category: "arts", title: "communication_language", label: "Communication & Language" },
      { category: "arts", title: "performing_arts", label: "Performing Arts" }
    ],

    medical: [
      { category: "medical", title: "care_compassion", label: "Care & Compassion" },
      { category: "medical", title: "biology_health", label: "Biology & Health" },
      { category: "medical", title: "practical_skills", label: "Practical Skills" }
    ],

    architecture: [
      { category: "architecture", title: "design_visualization", label: "Design & Visualization" },
      { category: "architecture", title: "math_structures", label: "Math & Structures" },
      { category: "architecture", title: "environment_aesthetics", label: "Environment & Aesthetics" }
    ],

    nursing: [
      { category: "nursing", title: "patient_care_empathy", label: "Patient Care & Empathy" },
      { category: "nursing", title: "medical_knowledge_basics", label: "Medical Knowledge Basics" },
      { category: "nursing", title: "teamwork_discipline", label: "Teamwork & Discipline" }
    ]
  };

  // Combine all streams into an "all" category
  const components = {
    ...streamComponents,
    all: Object.values(streamComponents).flat()
  };

  useEffect(() => {

    const getCurrentUser = async () => {

      try {

        const token = await getToken({ template: "myTokenTemplate" });

        if (!token) return;

        const data = await current_user(token);

        setCurrentUser(data);

      } catch (err) {
        console.log(err);
      }
    };

    getCurrentUser();

  }, [getToken]);


  const startTest = async () => {

    try {

      let allQuestions = [];

      const skills = components[onselect];

      for (const skill of skills) {

        const res = await fetch(
          `http://127.0.0.1:8000/v1/aptitude/category-based/${skill.category}/${skill.title}`
        );

        const data = await res.json();

        allQuestions = [...allQuestions, ...data];
      }

      setQuestions(allQuestions);
      setSubCategory(true);

    } catch (err) {
      console.log(err);
    }
  };


  const handleOptionChange = (qid, option) => {

    setAnswers((prev) => ({
      ...prev,
      [qid]: option
    }));
  };


  const handleSubmit = async () => {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/v1/aptitude/submit-test",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: currentUser?.id || 1,
            answers: Object.keys(answers).map((qid) => ({
              question_id: Number(qid),
              selected_option: answers[qid]
            }))
          })
        }
      );

      const data = await res.json();
      setResult(data);

      if (onTestComplete) {
        onTestComplete();
      }

    } catch (err) {
      console.log(err);
      setToast({
        show: true,
        message: "Submission failed!",
        type: "error"
      });
    }
  };


  const handleOverlayClick = (e) => {

    if (e.target.id === "overlay") {

      setSubCategory(false);
      setQuestions([]);
      setAnswers({});
    }
  };


  const startSpecificTest = async (skill) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/v1/aptitude/category-based/${skill.category}/${skill.title}`
      );
      const data = await res.json();
      setQuestions(data);
      setSubCategory(true);
    } catch (err) {
      console.log(err);
    }
  };

  const selectedCards = components[onselect] || [];

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {selectedCards.map((card, i) => (
          <div
            key={i}
            onClick={() => startSpecificTest(card)}
            className="bg-white border p-6 rounded-xl shadow-md flex flex-col gap-3 cursor-pointer hover:shadow-lg hover:border-blue-400 transition-all"
          >
            <h3 className="text-lg font-semibold">{card.label}</h3>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button
          onClick={startTest}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 shadow-md hover:scale-105 transition-all cursor-pointer font-semibold rounded-lg"
        >
          Start {onselect === 'all' ? 'Full' : onselect.charAt(0).toUpperCase() + onselect.slice(1)} Test
        </button>
      </div>

      {SubCategory && (

        <div
          id="overlay"
          onClick={handleOverlayClick}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white w-[70%] p-8 rounded-xl overflow-y-auto max-h-[85vh]"
          >
            <button
              id="overlay"
              className="absolute right-5 top-5 border p-1 px-3 rounded-md bg-[#ff5432e6] hover:bg-[#ff3b14] text-white cursor-pointer shadow-md"
              onClick={handleOverlayClick}
            >
              Close
            </button>

            <h2 className="text-2xl font-bold mb-6">Aptitude Quiz</h2>

            {!result && questions.map((q, index) => (

              <div key={q.id} className="mb-6">

                <p className="font-semibold">
                  Q{index + 1}. {q.question}
                </p>

                <div className="flex flex-col gap-2 mt-2">

                  {q.options.map((opt) => (

                    <label key={opt} className="flex gap-2">

                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        checked={answers[q.id] === opt}
                        onChange={() => handleOptionChange(q.id, opt)}
                      />

                      {opt}

                    </label>

                  ))}

                </div>

              </div>

            ))}

            {!result && (

              <div className="flex gap-4">

                <button
                  onClick={() => setSubCategory(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>

              </div>

            )}


            {result && (

              <div className="mt-6">

                <h3 className="text-xl font-bold">
                  Recommended Career: {result.recommended_career}
                </h3>

                <p className="mt-3">
                  {result.ai_explanation}
                </p>

                <button
                  onClick={() => setResult(null)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Close
                </button>

              </div>

            )}

          </div>

        </div>

      )}


      {toast.show && (

        <div className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded">

          {toast.message}

        </div>

      )}

    </div>
  );
}

export default CareerQuestions;


