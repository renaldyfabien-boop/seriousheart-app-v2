 import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function SavedProfiles({ user, onBackHome, onStartTest }) {
  const [profiles, setProfiles] = useState([]);
  const [membershipActive, setMembershipActive] = useState(false);

  useEffect(() => {
    async function loadAll() {
      const { data: me } = await supabase
        .from("profiles")
        .select("membership_active")
        .eq("user_id", user.id)
        .maybeSingle();

      setMembershipActive(!!me?.membership_active);

      if (!me?.membership_active) return;

      const { data } = await supabase.from("profiles").select("*");
      setProfiles(data || []);
    }

    loadAll();
  }, [user.id]);

  function getDisplayPhoto(profile) {
    if (profile.photo) return profile.photo;
    return "https://via.placeholder.com/120x120.png?text=Member";
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f7f4f8", padding: "40px 20px", fontFamily: "Arial, sans-serif", color: "#1f1722" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "24px" }}>
          <button onClick={onBackHome}>Back to Home</button>
          <button onClick={onStartTest}>Start Test</button>
        </div>

        <h1>Saved Profiles</h1>

        {!membershipActive ? (
          <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "24px" }}>
            <h2>Membership Required</h2>
            <p>Saved profiles are locked until your membership is active.</p>
          </div>
        ) : profiles.length === 0 ? (
          <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "24px" }}>
            <p>No saved profiles yet.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "18px" }}>
            {profiles.map((profile) => (
              <div key={profile.user_id} style={{ backgroundColor: "white", borderRadius: "18px", padding: "20px" }}>
                <div style={{ display: "flex", gap: "14px", alignItems: "center", marginBottom: "14px" }}>
                  <img
                    src={getDisplayPhoto(profile)}
                    alt={profile.name}
                    style={{ width: "76px", height: "76px", borderRadius: "50%", objectFit: "cover" }}
                  />
                  <div>
                    <h3>{profile.name}{profile.age ? `, ${profile.age}` : ""}</h3>
                    <p>Saved member profile</p>
                  </div>
                </div>

                {profile.bio && <p>{profile.bio}</p>}
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Phone:</strong> {profile.phone}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedProfiles;