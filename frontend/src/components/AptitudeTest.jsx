// import { useEffect, useState } from "react";

// function AptitudeTest() {

//   const [questions, setQuestions] = useState([]);

//   useEffect(() => {

//     const fetchQuestions = async () => {

//       const response = await fetch("http://127.0.0.1:8000/v1/aptitude/questions");

//       const data = await response.json();

//       setQuestions(data);

//     };

//     fetchQuestions();

//   }, []);

//   return (

//     <div>

//       <h2>Aptitude Test</h2>

//       {questions.map((q) => (

//         <div key={q.id} style={{marginBottom:"20px"}}>

//           <h3>{q.question}</h3>

//           {q.options.map((option, index) => (

//             <button key={index} style={{margin:"5px"}}>

//               {option}

//             </button>

//           ))}

//         </div>

//       ))}

//     </div>

//   );
// }

// export default AptitudeTest;
// import { useState, useEffect } from "react";

// const AptitudeTest = () => {
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/v1/aptitude/questions")
//       .then((res) => res.json())
//       .then((data) => setQuestions(data));
//   }, []);

//   const handleOptionChange = (questionId, option) => {
//     setAnswers({
//       ...answers,
//       [questionId]: option,
//     });
//   };

//   return (
//     <div>
//       <h1>Aptitude Test</h1>

//       {questions.map((q) => (
//         <div key={q.id} style={{ marginBottom: "20px" }}>
//           <h3>{q.question}</h3>

//           {q.options.map((opt) => (
//             <label key={opt} style={{ display: "block" }}>
//               <input
//                 type="radio"
//                 name={q.id}
//                 value={opt}
//                 onChange={() => handleOptionChange(q.id, opt)}
//               />
//               {opt}
//             </label>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AptitudeTest;
import { useState, useEffect } from "react";

const AptitudeTest = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/v1/aptitude/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  const handleOptionChange = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: option,
    });
  };

  const submitTest = async () => {
    const formattedAnswers = Object.entries(answers).map(([qid, option]) => ({
      question_id: parseInt(qid),
      selected_option: option,
    }));

    const response = await fetch("http://127.0.0.1:8000/submit-test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answers: formattedAnswers }),
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Aptitude Test</h1>

      {questions.map((q) => (
        <div key={q.id} style={{ marginBottom: "20px" }}>
          <h3>{q.question}</h3>

          {q.options.map((opt) => (
            <label key={opt} style={{ display: "block" }}>
              <input
                type="radio"
                name={q.id}
                value={opt}
                onChange={() => handleOptionChange(q.id, opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}

      <button onClick={submitTest} style={{ padding: "10px 20px" }}>
        Submit Test
      </button>

      {result && (
        <div style={{ marginTop: "30px" }}>
          <h2>Recommended Career: {result.recommended_career}</h2>
        </div>
      )}
    </div>
  );
};

export default AptitudeTest;
