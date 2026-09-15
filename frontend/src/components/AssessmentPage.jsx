import React, { useEffect, useState } from 'react';
import { api } from '../api/api.js';

export default function AssessmentPage({ type }) {
  const [questions, setQuestions] = useState({});
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setQuestions({});
    setAnswers({});
    setResult(null);
    setMessage('');

    api.getQuestions(type)
      .then(setQuestions)
      .catch((error) => setMessage(error.message));
  }, [type]);

  const allQuestions = Object.values(questions).flat();

  const submitAssessment = async () => {
    if (Object.keys(answers).length !== allQuestions.length) {
      setMessage('Please answer every question before submitting');
      return;
    }

    try {
      const data = await api.submitAssessment(type, answers);
      setResult(data);
      setMessage('Assessment submitted successfully');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const title =
    type === 'Readiness'
      ? 'Digital Readiness'
      : type === 'Barrier'
      ? 'Digital Barriers'
      : 'Business Performance';

  return (
    <div className="page">
      <h1>{title}</h1>

      <p className="muted">
        Rate each statement from 1 (Strongly Disagree) to 5 (Strongly Agree).
      </p>

      {message && (
        <p className={result ? 'success' : 'error'}>
          {message}
        </p>
      )}

      {Object.entries(questions).map(([dimension, items]) => (
        <div className="card" key={dimension}>
          <h2>{dimension}</h2>

          {items.map((question) => (
            <div className="question" key={question.id}>
              <p>{question.question_text}</p>

              <div className="likert">
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value}>
                    <input
                      type="radio"
                      name={`q${question.id}`}
                      checked={Number(answers[question.id]) === value}
                      onChange={() =>
                        setAnswers({
                          ...answers,
                          [question.id]: value
                        })
                      }
                    />
                    {value}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}

      {allQuestions.length > 0 && (
        <button
          className="primary"
          onClick={submitAssessment}
        >
          Submit Assessment
        </button>
      )}

      {result && (
        <div className="card result">
          <h2>
            Result: {result.overall_score} / 5 — {result.level}
          </h2>

          <table>
            <thead>
              <tr>
                <th>Dimension</th>
                <th>Score</th>
                <th>Level</th>
              </tr>
            </thead>

            <tbody>
              {Object.entries(result.dimensions).map(
                ([dimension, info]) => (
                  <tr key={dimension}>
                    <td>{dimension}</td>
                    <td>{info.score}</td>
                    <td>{info.level}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}