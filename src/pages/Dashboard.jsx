 import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Dashboard({ user, onBackHome }) {
  const [membershipActive, setMembershipActive] = useState(null);
  const [membershipPlan, setMembershipPlan] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", user.email)
        .maybeSingle();

      if (data) {
        setMembershipActive(data.membership_active);
        setMembershipPlan(data.membership_plan);
      }
    };

    loadProfile();
  }, [user]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Dashboard</h1>

      <p>Welcome {user?.email}</p>

      <h2>
        Membership Status:{" "}
        {membershipActive ? "Active ✅" : "Inactive ❌"}
      </h2>

      {membershipActive && (
        <p>Plan: {membershipPlan || "Bronze"}</p>
      )}

      <button onClick={onBackHome}>Back Home</button>
    </div>
  );
}
