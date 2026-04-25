 import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function EditProfile({ user, onBackHome, onViewDashboard }) {
  const [member, setMember] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState("");
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (data) {
        setMember(data);
        setName(data.name || "");
        setAge(data.age || "");
        setPhone(data.phone || "");
        setPhoto(data.photo || "");
        setBio(data.bio || "");
      }
    }

    loadProfile();
  }, [user.id]);

  function isValidPhone(value) {
    const digitsOnly = String(value).replace(/\D/g, "");
    return digitsOnly.length >= 10;
  }

  function isValidAge(value) {
    const num = Number(value);
    return Number.isInteger(num) && num >= 18 && num <= 99;
  }

  function handlePhotoUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setMessage("Please upload a valid image file.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
      setMessage("");
    };
    reader.readAsDataURL(file);
  }

  async function saveChanges() {
    if (!member) return setMessage("No member profile found.");
    if (!name.trim()) return setMessage("Please enter your name.");
    if (!isValidAge(age)) return setMessage("Please enter a valid age between 18 and 99.");
    if (!phone.trim() || !isValidPhone(phone)) return setMessage("Please enter a valid phone number.");

    const { error } = await supabase
      .from("profiles")
      .update({
        name: name.trim(),
        age: Number(age),
        phone: phone.trim(),
        photo,
        bio: bio.trim(),
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);

    setMessage(error ? error.message : "Profile updated successfully.");
  }

  function getDisplayPhoto() {
    return photo || "https://via.placeholder.com/140x140.png?text=Member";
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f7f4f8", padding: "40px 20px", fontFamily: "Arial, sans-serif", color: "#1f1722" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "24px" }}>
          <button onClick={onBackHome}>Back to Home</button>
          <button onClick={onViewDashboard}>Back to Dashboard</button>
        </div>

        <div style={{ backgroundColor: "white", borderRadius: "18px", padding: "28px" }}>
          <h1>Edit Profile</h1>

          {!member ? (
            <p>No member profile found. Complete the test and save a profile first.</p>
          ) : (
            <>
              <div style={{ marginBottom: "20px" }}>
                <img
                  src={getDisplayPhoto()}
                  alt="Profile preview"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div style={{ display: "grid", gap: "14px", maxWidth: "560px" }}>
                <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                <input value={user.email || ""} readOnly />
                <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

                <div>
                  <label>Upload new profile photo</label>
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} />
                </div>

                <textarea placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={5} />
                <button onClick={saveChanges}>Save Changes</button>
              </div>

              {message && <p style={{ marginTop: "16px", fontWeight: "bold" }}>{message}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditProfile;