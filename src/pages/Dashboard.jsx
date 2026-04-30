  function Dashboard({ user, onBackHome }) {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Dashboard</h1>

      <p>Welcome {user?.email || "Member"}</p>

      <button onClick={onBackHome}>
        Back Home
      </button>
    </div>
  );
}

export default Dashboard;
