 import { useState } from "react";

export default function Test({
  onBackHome,
  onViewDashboard,
  onViewSavedProfiles,
}) {
  const questions = [
    "I feel attracted to people who remind me of my parents.",
    "Familiar emotional patterns make me feel connected.",
    "I feel uneasy dating people similar to my parents.",
    "My partners often have characteristics of my parents.",
    "I feel drawn to emotionally intense partners.",
    'I try to "fix" partners emotionally.',
    "I repeat unhealthy relationship patterns.",
    "My partners remind me of unresolved situations in my life.",
    "I'm attracted to people with qualities I admire.",
    "I feel connected to people who boost my self-image.",
    "I feel fulfilled by admirable partners.",
    "I seek partners who help me grow.",
    "I'm comfortable with emotional closeness.",
    "I pull away when things get too close.",
    "I worry my partner doesn’t love me enough.",
    "I highly value independence in relationships.",
  ];

  const scaleLabels = [
    "Strongly Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly Agree",
  ];

  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleAnswer = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const answeredCount = answers.filter((a) => a !== null).length;
  const progress = Math.round((answeredCount / questions.length) * 100);

  if (!started) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(180deg, #f7f4f8 0%, #f3ecff 45%, #fff8ef 100%)",
          padding: "60px 20px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "34px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "8px 16px",
              borderRadius: "999px",
              backgroundColor: "#efe7ff",
              color: "#6f3cc3",
              fontWeight: "bold",
              fontSize: "14px",
              marginBottom: "18px",
            }}
          >
            Romantic Compatibility Scale
          </div>

          <h1
            style={{
              fontSize: "44px",
              marginTop: 0,
              marginBottom: "14px",
              color: "#22172b",
            }}
          >
            Compatibility Test
          </h1>

          <p
            style={{
              color: "#5f5364",
              fontSize: "18px",
              lineHeight: "1.7",
              marginBottom: "24px",
            }}
          >
            This test explores recurring romantic patterns, emotional attraction,
            self-image, and attachment tendencies to support more meaningful
            compatibility matching.
          </p>

          <div
            style={{
              backgroundColor: "#f9f7fb",
              borderRadius: "16px",
              padding: "22px",
              marginBottom: "24px",
            }}
          >
            <h3 style={{ marginTop: 0, color: "#22172b" }}>Instructions</h3>

            <ul
              style={{
                lineHeight: "1.9",
                color: "#4b5563",
                paddingLeft: "20px",
                marginBottom: 0,
              }}
            >
              <li>Answer all 16 statements as honestly as possible.</li>
              <li>Choose the option that best reflects your usual tendency.</li>
              <li>Do not overthink your responses.</li>
              <li>
                Use this scale: 1 = Strongly Disagree, 2 = Disagree, 3 = Neutral,
                4 = Agree, 5 = Strongly Agree.
              </li>
            </ul>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "12px",
              marginBottom: "28px",
            }}
          >
            {scaleLabels.map((label, index) => (
              <div
                key={label}
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #ece7f2",
                  borderRadius: "12px",
                  padding: "12px",
                  textAlign: "center",
                  fontSize: "14px",
                  color: "#4b5563",
                }}
              >
                <strong>{index + 1}</strong>
                <div style={{ marginTop: "4px" }}>{label}</div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => setStarted(true)}
              style={{
                padding: "16px 24px",
                fontSize: "17px",
                borderRadius: "12px",
                border: "none",
                backgroundColor: "#6f3cc3",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Start Test
            </button>

            <button
              onClick={onBackHome}
              style={{
                padding: "16px 24px",
                fontSize: "16px",
                borderRadius: "12px",
                border: "1px solid #ddd",
                backgroundColor: "white",
                cursor: "pointer",
              }}
            >
              Back Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f7f4f8 0%, #f3ecff 45%, #fff8ef 100%)",
        padding: "50px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "24px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
            marginBottom: "22px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h1 style={{ margin: 0, color: "#22172b" }}>
                Compatibility Test
              </h1>
              <p style={{ margin: "8px 0 0 0", color: "#5f5364" }}>
                Answer all 16 questions to complete your profile.
              </p>
            </div>

            <button
              onClick={onBackHome}
              style={{
                padding: "12px 16px",
                fontSize: "15px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                backgroundColor: "white",
                cursor: "pointer",
              }}
            >
              Back Home
            </button>
          </div>

          <div style={{ marginTop: "18px" }}>
            <div
              style={{
                height: "10px",
                backgroundColor: "#eee8f5",
                borderRadius: "999px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  backgroundColor: "#6f3cc3",
                }}
              />
            </div>
            <p
              style={{
                marginTop: "10px",
                marginBottom: 0,
                color: "#5f5364",
                fontSize: "14px",
              }}
            >
              Progress: {answeredCount} of {questions.length} answered
            </p>
          </div>
        </div>

        {questions.map((q, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "white",
              padding: "22px",
              borderRadius: "18px",
              marginBottom: "16px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
            }}
          >
            <p
              style={{
                marginBottom: "16px",
                fontWeight: "bold",
                fontSize: "17px",
                color: "#22172b",
                lineHeight: "1.6",
              }}
            >
              {i + 1}. {q}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                gap: "10px",
              }}
            >
              {scaleLabels.map((label, idx) => {
                const val = idx + 1;
                const selected = answers[i] === val;

                return (
                  <button
                    key={val}
                    onClick={() => handleAnswer(i, val)}
                    style={{
                      padding: "12px 10px",
                      borderRadius: "10px",
                      border: selected
                        ? "2px solid #6f3cc3"
                        : "1px solid #ddd",
                      backgroundColor: selected ? "#efe7ff" : "white",
                      color: "#3f3545",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: selected ? "bold" : "normal",
                    }}
                  >
                    {val} - {label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div
          style={{
            textAlign: "center",
            marginTop: "24px",
            marginBottom: "10px",
          }}
        >
          <button
            onClick={onViewDashboard}
            style={{
              padding: "16px 22px",
              fontSize: "16px",
              borderRadius: "12px",
              border: "none",
              backgroundColor: "#6f3cc3",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              marginRight: "10px",
            }}
          >
            Submit Test
          </button>

          <button
            onClick={onViewSavedProfiles}
            style={{
              padding: "16px 22px",
              fontSize: "16px",
              borderRadius: "12px",
              border: "1px solid #ddd",
              backgroundColor: "white",
              cursor: "pointer",
            }}
          >
            Saved Profiles
          </button>
        </div>
      </div>
    </div>
  );
}