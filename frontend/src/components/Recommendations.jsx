import React, { useEffect, useState } from 'react';
import { api } from '../api/api.js';

export default function Recommendations() {
  const [r, setR] = useState([]);
  const [e, setE] = useState('');

  useEffect(() => {
    api.recommendations()
      .then(setR)
      .catch((x) => setE(x.message));
  }, []);

  // Convert database priority number into display priority
  const getPriority = (priority) => {
    const p = Number(priority);

    if (p === 1) {
      return {
        label: 'High Priority',
        className: 'priority-high'
      };
    }

    if (p === 2) {
      return {
        label: 'Medium Priority',
        className: 'priority-medium'
      };
    }

    return {
      label: 'Lower Priority',
      className: 'priority-low'
    };
  };

  // Group recommendations by assessment session
  const sessions = r.reduce((groups, item) => {
    const sessionId = item.session_id;

    if (!groups[sessionId]) {
      groups[sessionId] = {
        session_id: sessionId,
        assessment_type: item.assessment_type,
        overall_score: item.overall_score,
        overall_level: item.overall_level,
        created_at: item.created_at,
        recommendations: []
      };
    }

    groups[sessionId].recommendations.push(item);

    return groups;
  }, {});

  // Newest assessment first
  const sessionList = Object.values(sessions).sort((a, b) => {
    const dateDifference =
      new Date(b.created_at) - new Date(a.created_at);

    if (dateDifference !== 0) {
      return dateDifference;
    }

    return Number(b.session_id) - Number(a.session_id);
  });

  return (
    <div className="page">
      <h1>Recommendations</h1>

      <p className="muted">
        Personalized recommendations based on your assessment results.
        Recommendations are grouped by assessment session and ordered by
        priority.
      </p>

      {e && <p className="error">{e}</p>}

      {!e && sessionList.length === 0 && (
        <p className="muted">
          Complete assessments to receive recommendations.
        </p>
      )}

      {sessionList.map((session, sessionIndex) => (
        <div
          className="recommendation-session"
          key={session.session_id}
        >
          {/* Assessment Header */}
          <div className="recommendation-header">

            <div>
              <h2>
                {session.assessment_type} Assessment

                {sessionIndex === 0 && (
                  <span className="latest-badge">
                    Latest
                  </span>
                )}
              </h2>

              <span className="muted">
                Completed on{' '}
                {new Date(session.created_at).toLocaleString()}
              </span>
            </div>

            <div className="recommendation-score">
              <div>
                <b>Overall Level:</b>{' '}
                {session.overall_level}
              </div>

              <div>
                <b>Overall Score:</b>{' '}
                {session.overall_score}
              </div>
            </div>

          </div>

          {/* Recommendations */}
          {[...session.recommendations]
            .sort(
              (a, b) =>
                Number(a.priority) - Number(b.priority)
            )
            .map((x, i) => {
              const priority = getPriority(x.priority);

              return (
                <div
                  className={`recommendation-item ${priority.className}`}
                  key={`${session.session_id}-${i}`}
                >
                  <div className="recommendation-top">

                    <div>
                      <h3>{x.priority_area}</h3>

                      <p>
                        {x.recommendation_text}
                      </p>
                    </div>

                    <span className="priority-label">
                      {priority.label}
                    </span>

                  </div>

                  <span className="badge">
                    {x.dimension} · {x.level}
                  </span>

                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
}