 import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Dashboard({ user, onBackHome }) {
  const [membershipActive, setMembershipActive] = useState(false);
  const [membershipPlan, setMembershipPlan] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", user.email)
        .single();

       alert("PROFILE DATA: " + JSON.stringify(data));
       alert("PROFILE ERROR: " + JSON.stringify(error));

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
      <h3>TEST DASHBOARD FILE UPDATED</h3>

      <p>Welcome {user?.email}</p>

      <h2>
        Membership Status:{" "}
        {membershipActive === true ? "Active ✅" : "Inactive ❌"}
      </h2>

      {membershipActive && <p>Plan: {membershipPlan || "Bronze"}</p>}

      <button onClick={onBackHome}>Back Home</button>
    </div>
  );
}