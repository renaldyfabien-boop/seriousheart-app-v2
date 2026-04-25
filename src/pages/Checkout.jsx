 export default function Checkout({ onBackHome }) {
  const plans = {
    bronze: {
      name: "Bronze",
      price: "$25/month",
      url: "https://www.paypal.com/ncp/payment/RLE4E477H7YVW",
      color: "#cd7f32",
      border: "#b87333",
      description: "A simple way to begin your SeriousHeart journey.",
      features: [
        "Access to membership entry",
        "Compatibility-centered experience",
        "A simple monthly plan",
      ],
    },
    silver: {
      name: "Silver",
      price: "$50/month",
      url: "https://www.paypal.com/ncp/payment/F3AA2HKHPVQSE",
      color: "#9ca3af",
      border: "#6b7280",
      description: "A stronger membership level for a deeper experience.",
      features: [
        "Everything in Bronze",
        "Enhanced membership level",
        "More room to grow with the platform",
      ],
    },
    gold: {
      name: "Gold",
      price: "$100/month",
      url: "https://www.paypal.com/ncp/payment/ZDKPNRY5M3Q8Q",
      color: "#f59e0b",
      border: "#d97706",
      description: "Our premium membership tier for the fullest experience.",
      features: [
        "Everything in Silver",
        "Premium membership tier",
        "Best option for full access positioning",
      ],
    },
  };

  const openPlan = (url) => {
    window.open(url, "_blank");
  };

  const cardStyle = (plan) => ({
    backgroundColor: "white",
    border: `2px solid ${plan.border}`,
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
    textAlign: "left",
  });

  const buttonStyle = (plan) => ({
    width: "100%",
    marginTop: "18px",
    padding: "14px 18px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "12px",
    border: "none",
    backgroundColor: plan.color,
    color: "white",
    cursor: "pointer",
  });

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
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto 36px auto",
            textAlign: "center",
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
            SeriousHeart Membership
          </div>

          <h1
            style={{
              fontSize: "48px",
              marginBottom: "14px",
              color: "#22172b",
            }}
          >
            Choose Your Plan
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#5f5364",
              lineHeight: "1.7",
              margin: "0 auto",
              maxWidth: "680px",
            }}
          >
            Select the membership level that fits your goals and continue to
            PayPal to complete your subscription.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "22px",
            alignItems: "stretch",
          }}
        >
          <div style={cardStyle(plans.bronze)}>
            <div
              style={{
                display: "inline-block",
                padding: "6px 12px",
                borderRadius: "999px",
                backgroundColor: "#f8ece3",
                color: plans.bronze.border,
                fontSize: "13px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              Bronze
            </div>

            <h2 style={{ margin: "0 0 8px 0", fontSize: "30px", color: "#22172b" }}>
              {plans.bronze.price}
            </h2>

            <p style={{ color: "#5f5364", lineHeight: "1.6", minHeight: "48px" }}>
              {plans.bronze.description}
            </p>

            <div
              style={{
                marginTop: "18px",
                paddingTop: "18px",
                borderTop: "1px solid #eee",
              }}
            >
              {plans.bronze.features.map((feature) => (
                <p
                  key={feature}
                  style={{
                    margin: "0 0 12px 0",
                    color: "#3f3545",
                    fontSize: "15px",
                  }}
                >
                  ✓ {feature}
                </p>
              ))}
            </div>

            <button
              onClick={() => openPlan(plans.bronze.url)}
              style={buttonStyle(plans.bronze)}
            >
              Choose Bronze
            </button>
          </div>

          <div
            style={{
              ...cardStyle(plans.silver),
              transform: "scale(1.02)",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-12px",
                right: "20px",
                backgroundColor: "#6f3cc3",
                color: "white",
                padding: "7px 12px",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              Popular
            </div>

            <div
              style={{
                display: "inline-block",
                padding: "6px 12px",
                borderRadius: "999px",
                backgroundColor: "#f3f4f6",
                color: plans.silver.border,
                fontSize: "13px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              Silver
            </div>

            <h2 style={{ margin: "0 0 8px 0", fontSize: "30px", color: "#22172b" }}>
              {plans.silver.price}
            </h2>

            <p style={{ color: "#5f5364", lineHeight: "1.6", minHeight: "48px" }}>
              {plans.silver.description}
            </p>

            <div
              style={{
                marginTop: "18px",
                paddingTop: "18px",
                borderTop: "1px solid #eee",
              }}
            >
              {plans.silver.features.map((feature) => (
                <p
                  key={feature}
                  style={{
                    margin: "0 0 12px 0",
                    color: "#3f3545",
                    fontSize: "15px",
                  }}
                >
                  ✓ {feature}
                </p>
              ))}
            </div>

            <button
              onClick={() => openPlan(plans.silver.url)}
              style={buttonStyle(plans.silver)}
            >
              Choose Silver
            </button>
          </div>

          <div style={cardStyle(plans.gold)}>
            <div
              style={{
                display: "inline-block",
                padding: "6px 12px",
                borderRadius: "999px",
                backgroundColor: "#fff4db",
                color: plans.gold.border,
                fontSize: "13px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              Gold
            </div>

            <h2 style={{ margin: "0 0 8px 0", fontSize: "30px", color: "#22172b" }}>
              {plans.gold.price}
            </h2>

            <p style={{ color: "#5f5364", lineHeight: "1.6", minHeight: "48px" }}>
              {plans.gold.description}
            </p>

            <div
              style={{
                marginTop: "18px",
                paddingTop: "18px",
                borderTop: "1px solid #eee",
              }}
            >
              {plans.gold.features.map((feature) => (
                <p
                  key={feature}
                  style={{
                    margin: "0 0 12px 0",
                    color: "#3f3545",
                    fontSize: "15px",
                  }}
                >
                  ✓ {feature}
                </p>
              ))}
            </div>

            <button
              onClick={() => openPlan(plans.gold.url)}
              style={buttonStyle(plans.gold)}
            >
              Choose Gold
            </button>
          </div>
        </div>

        <div
          style={{
            marginTop: "34px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#6b6170",
              fontSize: "14px",
              lineHeight: "1.6",
              marginBottom: "18px",
            }}
          >
            You will be redirected to PayPal in a new tab to complete your
            membership payment securely.
          </p>

          <button
            onClick={onBackHome}
            style={{
              padding: "12px 18px",
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
      </div>
    </div>
  );
}