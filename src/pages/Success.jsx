 import { useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Success({ onViewDashboard, onBackHome }) {
  useEffect(() => {
    async function activateMembership() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      await supabase
        .from("profiles")
        .update({
          membership_active: true,
          membership_plan: "bronze",
        })
        .eq("user_id", user.id);
    }

    activateMembership();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Payment Successful 🎉</h1>
      <p>Your membership is now active.</p>

      <button onClick={onViewDashboard}>Go to Dashboard</button>
      <br /><br />
      <button onClick={onBackHome}>Back Home</button>
    </div>
  );
}
