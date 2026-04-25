 export default function Success({ onBackHome, onViewDashboard }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f7f4f8",
        padding: "60px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "18px",
          padding: "32px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "40px", marginBottom: "10px", color: "#1f7a4d" }}>
          Payment Successful
        </h1>

        <p style={{ fontSize: "18px", color: "#5f5364", lineHeight: "1.7" }}>
          Thank you for joining SeriousHeart. Your membership request was received.
        </p>

        <p style={{ fontSize: "16px", color: "#5f5364", lineHeight: "1.7", marginTop: "16px" }}>
          If your access does not update immediately, sign in again or contact us for confirmation.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginTop: "28px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={onViewDashboard}
            style={{
              padding: "14px 18px",
              fontSize: "16px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#6f3cc3",
              color: "white",
              cursor: "pointer",
            }}
          >
            Go to Dashboard
          </button>

          <button
            onClick={onBackHome}
            style={{
              padding: "14px 18px",
              fontSize: "16px",
              borderRadius: "10px",
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