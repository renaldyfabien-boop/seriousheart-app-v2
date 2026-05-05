 import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Dashboard({ user, onBackHome }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      setProfile(data);
    }

    loadProfile();
  }, [user]);

  const membershipActive = profile?.membership_active;
  const membershipPlan = profile?.membership_plan;

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Dashboard</h1>

      <p>Welcome {user?.email}</p>

      <h2>
        Membership Status:{" "}
        {membershipActive ? "Active ✅" : "Inactive ❌"}
      </h2>

      {membershipActive && (
        <p>Plan: {membershipPlan ? membershipPlan.toUpperCase() : "Not set"}</p>
      )}

      <button onClick={onBackHome}>Back Home</button>
    </div>
  );
}
