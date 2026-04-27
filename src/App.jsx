 import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import Test from "./pages/Test";
import SavedProfiles from "./pages/SavedProfiles";
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
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

  // IMPORTANT: These pages must come BEFORE the login check.
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
            Sign in or create an account to access member features, saved
            profiles, and your compatibility experience.
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
            <p
              style={{
                marginTop: "16px",
                fontWeight: "bold",
                color: "#4b5563",
              }}
            >
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

  const membershipActive = !!profile?.membership_active;
  const membershipPlan = profile?.membership_plan;

  const planLabel = {
    monthly: "Monthly",
    quarterly: "Quarterly",
    annual: "Annual",
    bronze: "Bronze",
    silver: "Silver",
    gold: "Gold",
  };

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
        <h1 style={{ fontSize: "52px", color: "#22172b" }}>
          Welcome to SeriousHeart
        </h1>

        <button onClick={signOut}>Sign Out</button>

        <p style={{ fontSize: "18px", color: "#5f5364", lineHeight: "1.7" }}>
          Discover psychologically compatible partners based on your unconscious
          motivations and build a more intentional romantic journey.
        </p>

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
            marginBottom: "24px",
          }}
        >
          Membership Status:{" "}
          {membershipActive
            ? `Active (${planLabel[membershipPlan] || "Plan"})`
            : "Inactive"}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          <button onClick={() => setPage("test")}>Take the Test</button>
          <button onClick={() => setPage("dashboard")}>Open Dashboard</button>
          <button onClick={() => setPage("saved")}>View Saved Profiles</button>
          <button onClick={() => setPage("checkout")}>Open Checkout</button>
        </div>

        <div style={{ marginTop: "30px" }}>
          <button onClick={() => setPage("success")}>Test Success Page</button>
          <button onClick={() => setPage("cancel")}>Test Cancel Page</button>
        </div>
      </div>
    </div>
  );
}

export default App;
