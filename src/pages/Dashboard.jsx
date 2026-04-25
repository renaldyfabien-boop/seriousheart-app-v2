 import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function Dashboard({ user, onBackHome, onStartTest, onViewSavedProfiles, onEditProfile }) {
  const [member, setMember] = useState(null);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    async function loadData() {
      const { data: me } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      setMember(me ?? null);

      if (!me?.membership_active) return;

      const { data: others } = await supabase
        .from("profiles")
        .select("*")
        .neq("user_id", user.id);

      const top = (others || [])
        .map((p) => ({
          ...p,
          compatibility: calculateCompatibility(me, p),
        }))
        .sort((a, b) => b.compatibility - a.compatibility)
        .slice(0, 3);

      setMatches(top);
    }

    loadData();
  }, [user.id]);

  function calculateCompatibility(userProfile, otherProfile) {
    const userScores = {
      ideal_self: userProfile.ideal_self,
      parental_image: userProfile.parental_image,
      unresolved_conflicts: userProfile.unresolved_conflicts,
      commitment: userProfile.commitment,
    };
    const otherScores = {
      ideal_self: otherProfile.ideal_self,
      parental_image: otherProfile.parental_image,
      unresolved_conflicts: otherProfile.unresolved_conflicts,
      commitment: otherProfile.commitment,
    };

    const categories = Object.keys(userScores);
    let diff = 0;
    categories.forEach((c) => {
      diff += Math.abs((userScores[c] || 0) - (otherScores[c] || 0));
    });
    const max = categories.length * 4;
    return Number((((max - diff) / max) * 100).toFixed(1));
  }

  function getDisplayPhoto(profile) {
    if (profile?.photo) return profile.photo;
    return "https://via.placeholder.com/140x140.png?text=Member";
  }

  const membershipActive = !!member?.membership_active;
  const membershipPlan = member?.membership_plan;

  const planLabel = {
    monthly: "Monthly",
    quarterly: "Quarterly",
    annual: "Annual",
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f7f4f8", padding: "40px 20px", fontFamily: "Arial, sans-serif", color: "#1f1722" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "24px" }}>
          <button onClick={onBackHome}>Back to Home</button>
          <button onClick={onStartTest}>Retake Test</button>
          <button onClick={onViewSavedProfiles}>View Saved Profiles</button>
          <button onClick={onEditProfile}>Edit Profile</button>
        </div>

        <h1 style={{ marginBottom: "12px" }}>Member Dashboard</h1>

        <div
          style={{
            display: "inline-block",
            marginBottom: "20px",
            padding: "8px 14px",
            borderRadius: "999px",
            fontSize: "14px",
            fontWeight: "bold",
            backgroundColor: membershipActive ? "#e6f7ee" : "#fde8e8",
            color: membershipActive ? "#1f7a4d" : "#b42318",
            border: membershipActive ? "1px solid #b7ebc6" : "1px solid #f5c2c2",
          }}
        >
          {membershipActive
            ? `Active Membership (${planLabel[membershipPlan] || "Plan"})`
            : "Inactive Membership"}
        </div>

        {!membershipActive ? (
          <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "24px" }}>
            <h2>Membership Required</h2>
            <p>Your dashboard is locked until your membership is active.</p>
          </div>
        ) : !member ? (
          <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "24px" }}>
            <p>No profile found. Complete the test first.</p>
          </div>
        ) : (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "20px", marginBottom: "24px" }}>
              <div style={{ backgroundColor: "white", borderRadius: "18px", padding: "24px" }}>
                <div style={{ display: "flex", gap: "18px", alignItems: "center" }}>
                  <img src={getDisplayPhoto(member)} alt={member.name} style={{ width: "110px", height: "110px", borderRadius: "50%", objectFit: "cover" }} />
                  <div>
                    <h2>{member.name}{member.age ? `, ${member.age}` : ""}</h2>
                    <p><strong>Email:</strong> {member.email}</p>
                    <p><strong>Phone:</strong> {member.phone}</p>
                  </div>
                </div>
                {member.bio && <p style={{ marginTop: "12px" }}>{member.bio}</p>}
              </div>

              <div style={{ backgroundColor: "white", borderRadius: "18px", padding: "24px" }}>
                <h3>Scores</h3>
                <div><strong>ideal self:</strong> {member.ideal_self}</div>
                <div><strong>parental image:</strong> {member.parental_image}</div>
                <div><strong>unresolved conflicts:</strong> {member.unresolved_conflicts}</div>
                <div><strong>commitment:</strong> {member.commitment}</div>
              </div>
            </div>

            <div style={{ backgroundColor: "white", borderRadius: "18px", padding: "24px" }}>
              <h2>Top Matches</h2>
              {matches.length === 0 ? (
                <p>No matches yet.</p>
              ) : (
                matches.map((match) => (
                  <div key={match.user_id} style={{ marginBottom: "20px" }}>
                    <h3>{match.name} ({match.compatibility}%)</h3>
                    <p>{match.email}</p>
                    <p>{match.phone}</p>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;