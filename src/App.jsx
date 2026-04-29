  import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";
import SavedProfiles from "./pages/SavedProfiles";
import Test from "./pages/Test";

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

  // 🔥 PRIORITY ROUTES (must come BEFORE login)
  if (page === "success") {
    return (
      <Success
        onBackHome={() => setPage("home")}
        onViewDashboard={() => setPage("dashboard")}
      />
    );
  }

  if (page === "cancel") {
    return <Cancel onBackHome={() => setPage("home")} />;
  }

  // 🔐 LOGIN PAGE
  if (!session) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>Welcome Back</h1>

        <input
          placeholder="Email"
          value={authEmail}
          onChange={(e) => setAuthEmail(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Password"
          type="password"
          value={authPassword}
          onChange={(e) => setAuthPassword(e.target.value)}
        />
        <br /><br />

        <button
          onClick={async () => {
            const { error } = await supabase.auth.signInWithPassword({
              email: authEmail,
              password: authPassword,
            });

            if (error) setAuthMessage(error.message);
          }}
        >
          Sign In
        </button>

        <br /><br />

        <button
          onClick={async () => {
            const { error } = await supabase.auth.signUp({
              email: authEmail,
              password: authPassword,
            });

            if (error) setAuthMessage(error.message);
          }}
        >
          Create Account
        </button>

        <p>{authMessage}</p>
      </div>
    );
  }

  // 🧭 APP ROUTES
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

  if (page === "dashboard") {
    return (
      <Dashboard
        onBackHome={() => setPage("home")}
        onEditProfile={() => setPage("edit")}
        onSavedProfiles={() => setPage("saved")}
      />
    );
  }

  if (page === "edit") {
    return <EditProfile onBack={() => setPage("dashboard")} />;
  }

  if (page === "saved") {
    return <SavedProfiles onBack={() => setPage("dashboard")} />;
  }

  if (page === "test") {
    return <Test onBack={() => setPage("home")} />;
  }

  // 🏠 HOME
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>SeriousHeart</h1>

      <button onClick={() => setPage("checkout")}>
        Go to Checkout
      </button>

      <br /><br />

      <button onClick={() => setPage("dashboard")}>
        Go to Dashboard
      </button>
    </div>
  );
}

export default App;
