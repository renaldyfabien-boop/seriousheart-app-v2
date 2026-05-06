 useEffect(() => {
  const activateMembership = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log("USER:", user);

    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .update({
        membership_active: true,
        membership_plan: "bronze",
      })
      .eq("id", user.id);

    console.log("UPDATE RESULT:", data, error);
  };

  activateMembership();
}, []);
