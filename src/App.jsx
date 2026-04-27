  import { useEffect, useState } from "react";
 import Success from "./pages/Success";
import { supabase } from "./lib/supabase";
import Test from "./pages/Test";
import SavedProfiles from "./pages/SavedProfiles";
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";
import Checkout from "./pages/Checkout";
import Cancel from "./pages/Cancel";
function App() {
  const [page, setPage] = useState(
  new URLSearchParams(window.location.search).get("page") || "home"
);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    async function loadProfile() {
      if (!session?.user) {
        setProfile(null);
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", session.user.id)
        .maybeSingle();

      setProfile(data ?? null);
    }

    loadProfile();
  }, [session]);

  async function signUp() {
    setAuthMessage("");
    const { error } = await supabase.auth.signUp({
      email: authEmail,
      password: authPassword,
    });

    setAuthMessage(
      error
        ? error.message
        : "Account created. If email confirmation is enabled, confirm your email, then sign in."
    );
  }

  async function signIn() {
    setAuthMessage("");
    const { error } = await supabase.auth.signInWithPassword({
      email: authEmail,
      password: authPassword,
    });

    setAuthMessage(error ? error.message : "Signed in successfully.");
  }

  async function signOut() {
    await supabase.auth.signOut();
    setPage("home");
  }

  const membershipActive = !!profile?.membership_active;
  const membershipPlan = profile?.membership_plan;

  const planLabel = {
    monthly: "Monthly",
    quarterly: "Quarterly",
    annual: "Annual",
  };

  if (!session) {
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
            maxWidth: "520px",
            margin: "0 auto",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "30px",
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
            SeriousHeart
          </div>

          <h1 style={{ fontSize: "42px", marginTop: 0, marginBottom: "12px" }}>
            Welcome Back
          </h1>

          <p style={{ color: "#5f5364", lineHeight: "1.7", fontSize: "16px" }}>
            Sign in or create an account to access member features, saved profiles,
            and your compatibility experience.
          </p>

          <div style={{ display: "grid", gap: "12px", marginTop: "24px" }}>
            <input
              placeholder="Email"
              value={authEmail}
              onChange={(e) => setAuthEmail(e.target.value)}
              style={{
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid #d6d1db",
                fontSize: "15px",
              }}
            />

            <input
              type="password"
              placeholder="Password"
              value={authPassword}
              onChange={(e) => setAuthPassword(e.target.value)}
              style={{
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid #d6d1db",
                fontSize: "15px",
              }}
            />

            <button
              onClick={signIn}
              style={{
                padding: "14px",
                borderRadius: "12px",
                border: "none",
                backgroundColor: "#6f3cc3",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              Sign In
            </button>

            <button
              onClick={signUp}
              style={{
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid #ddd",
                backgroundColor: "white",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              Create Account
            </button>
          </div>

          {authMessage && (
            <p style={{ marginTop: "16px", fontWeight: "bold", color: "#4b5563" }}>
              {authMessage}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (page === "test") {
    return (
      <Test
        user={session.user}
        onBackHome={() => setPage("home")}
        onViewSavedProfiles={() => setPage("saved")}
        onViewDashboard={() => setPage("dashboard")}
      />
    );
  }

  if (page === "saved") {
    return (
      <SavedProfiles
        user={session.user}
        onBackHome={() => setPage("home")}
        onStartTest={() => setPage("test")}
      />
    );
  }

  if (page === "dashboard") {
    return (
      <Dashboard
        user={session.user}
        onBackHome={() => setPage("home")}
        onStartTest={() => setPage("test")}
        onViewSavedProfiles={() => setPage("saved")}
        onEditProfile={() => setPage("edit")}
      />
    );
  }

  if (page === "edit") {
    return (
      <EditProfile
        user={session.user}
        onBackHome={() => setPage("home")}
        onViewDashboard={() => setPage("dashboard")}
      />
    );
  }

  if (page === "checkout") {
  return (
    <Checkout
      user={session.user}
      onBackHome={() => setPage("home")}
      onStartTest={() => setPage("test")}
      onViewDashboard={() => setPage("dashboard")}
    />
  );
}

  if (page === "success") {
    return (
      <Success
        onBackHome={() => setPage("home")}
        onViewDashboard={() => setPage("dashboard")}
      />
    );
  }

  if (page === "cancel") {
    return (
      <Cancel
        onBackHome={() => setPage("home")}
        onReturnCheckout={() => setPage("checkout")}
      />
    );
  }

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
            SeriousHeart
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "14px",
              flexWrap: "wrap",
              marginBottom: "10px",
            }}
          >
            <div style={{ flex: 1, minWidth: "260px", textAlign: "left" }}>
              <h1
                style={{
                  fontSize: "52px",
                  margin: 0,
                  color: "#22172b",
                }}
              >
                Welcome to SeriousHeart
              </h1>
            </div>

            <button
              onClick={signOut}
              style={{
                padding: "12px 18px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                backgroundColor: "white",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              Sign Out
            </button>
          </div>

          <p
            style={{
              fontSize: "18px",
              color: "#5f5364",
              lineHeight: "1.7",
              margin: "16px auto 0 auto",
              maxWidth: "700px",
            }}
          >
            Discover psychologically compatible partners based on your
            unconscious motivations and build a more intentional romantic journey.
          </p>
        </div>

        <div
          style={{
            marginBottom: "28px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              padding: "12px 18px",
              borderRadius: "999px",
              display: "inline-block",
              fontSize: "14px",
              fontWeight: "bold",
              backgroundColor: membershipActive ? "#e6f7ee" : "#f5f5f5",
              color: membershipActive ? "#1f7a4d" : "#555",
              border: membershipActive ? "1px solid #b7ebc6" : "1px solid #ddd",
            }}
          >
            Membership Status:{" "}
            {membershipActive
              ? `Active (${planLabel[membershipPlan] || "Plan"})`
              : "Inactive"}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
              border: "1px solid #f0ebf4",
            }}
          >
            <h2 style={{ marginTop: 0, color: "#22172b" }}>Compatibility Test</h2>
            <p style={{ color: "#5f5364", lineHeight: "1.6", minHeight: "72px" }}>
              Take your psychological compatibility test and begin your matching journey.
            </p>
            <button
              onClick={() => setPage("test")}
              style={{
                width: "100%",
                padding: "15px",
                fontSize: "16px",
                borderRadius: "12px",
                border: "none",
                backgroundColor: "#6f3cc3",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Take the Test
            </button>
          </div>

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
              border: "1px solid #f0ebf4",
            }}
          >
            <h2 style={{ marginTop: 0, color: "#22172b" }}>Member Dashboard</h2>
            <p style={{ color: "#5f5364", lineHeight: "1.6", minHeight: "72px" }}>
              Access your account area, track your progress, and manage your experience.
            </p>
            <button
              onClick={() => setPage("dashboard")}
              style={{
                width: "100%",
                padding: "15px",
                fontSize: "16px",
                borderRadius: "12px",
                border: "1px solid #ddd",
                backgroundColor: "white",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Open Dashboard
            </button>
          </div>

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
              border: "1px solid #f0ebf4",
            }}
          >
            <h2 style={{ marginTop: 0, color: "#22172b" }}>Saved Profiles</h2>
            <p style={{ color: "#5f5364", lineHeight: "1.6", minHeight: "72px" }}>
              Review saved matches and keep track of the profiles that interest you most.
            </p>
            <button
              onClick={() => setPage("saved")}
              style={{
                width: "100%",
                padding: "15px",
                fontSize: "16px",
                borderRadius: "12px",
                border: "1px solid #ddd",
                backgroundColor: "white",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              View Saved Profiles
            </button>
          </div>

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
              border: "2px solid #f59e0b",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "6px 12px",
                borderRadius: "999px",
                backgroundColor: "#fff4db",
                color: "#d97706",
                fontSize: "12px",
                fontWeight: "bold",
                marginBottom: "14px",
              }}
            >
              Membership
            </div>

            <h2 style={{ marginTop: 0, color: "#22172b" }}>Membership Checkout</h2>
            <p style={{ color: "#5f5364", lineHeight: "1.6", minHeight: "72px" }}>
              Choose Bronze, Silver, or Gold and continue to PayPal to activate your membership.
            </p>
            <button
              onClick={() => setPage("checkout")}
              style={{
                width: "100%",
                padding: "15px",
                fontSize: "16px",
                borderRadius: "12px",
                border: "none",
                backgroundColor: "#f59e0b",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Open Checkout
            </button>
          </div>
        </div>

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setPage("success")}
            style={{
              padding: "12px 16px",
              fontSize: "15px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              backgroundColor: "white",
              cursor: "pointer",
            }}
          >
            Test Success Page
          </button>

          <button
            onClick={() => setPage("cancel")}
            style={{
              padding: "12px 16px",
              fontSize: "15px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              backgroundColor: "white",
              cursor: "pointer",
            }}
          >
            Test Cancel Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
