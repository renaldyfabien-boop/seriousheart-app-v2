 export default function Cancel({ onBackHome, onReturnCheckout }) {
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
        <h1 style={{ fontSize: "40px", marginBottom: "10px", color: "#b45309" }}>
          Payment Canceled
        </h1>

        <p style={{ fontSize: "18px", color: "#5f5364", lineHeight: "1.7" }}>
          Your payment was not completed. You can return to checkout and try again whenever you are ready.
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
            onClick={onReturnCheckout}
            style={{
              padding: "14px 18px",
              fontSize: "16px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#f59e0b",
              color: "white",
              cursor: "pointer",
            }}
          >
            Return to Checkout
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