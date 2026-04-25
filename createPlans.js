 const CLIENT_ID = "Ab0VQ32jjJNT-96mRlhzgGZcPAVMTyCl_Qyd_di4eA9ncJzx6LPb98KGsVuhHCkleSxdMggcusLrRCqm";
const SECRET = "EE84S5mq1zGp291XqEl-uhaKDJKHnpsz10SnVJm69XWZunNEhTPGbDlg6eW1TuYTqJbcZKYfA529A32F";
async function getAccessToken() {
  const response = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " + Buffer.from(`${CLIENT_ID}:${SECRET}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  console.log("TOKEN RESPONSE:", data);

  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || "Could not get access token.");
  }

  return data.access_token;
}

async function createProduct(token) {
  const response = await fetch("https://api-m.sandbox.paypal.com/v1/catalogs/products", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      name: "SeriousHeart Membership",
      description: "SeriousHeart subscription plans",
      type: "SERVICE",
      category: "SOFTWARE",
    }),
  });

  const data = await response.json();
  console.log("PRODUCT RESPONSE:", data);

  if (!response.ok || !data.id) {
    throw new Error(data.message || "Could not create product.");
  }

  return data;
}

async function createPlan(token, productId, name, price) {
  const response = await fetch("https://api-m.sandbox.paypal.com/v1/billing/plans", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      product_id: productId,
      name,
      description: `${name} monthly plan`,
      status: "ACTIVE",
      billing_cycles: [
        {
          frequency: {
            interval_unit: "MONTH",
            interval_count: 1,
          },
          tenure_type: "REGULAR",
          sequence: 1,
          total_cycles: 0,
          pricing_scheme: {
            fixed_price: {
              value: price,
              currency_code: "USD",
            },
          },
        },
      ],
      payment_preferences: {
        auto_bill_outstanding: true,
        setup_fee: {
          value: "0",
          currency_code: "USD",
        },
        setup_fee_failure_action: "CONTINUE",
        payment_failure_threshold: 3,
      },
    }),
  });

  const data = await response.json();
  console.log(`${name.toUpperCase()} PLAN RESPONSE:`, data);

  if (!response.ok || !data.id) {
    throw new Error(data.message || `Could not create ${name} plan.`);
  }

  return data;
}

async function run() {
  try {
    const token = await getAccessToken();
    const product = await createProduct(token);

    console.log("==================================");
    console.log("PRODUCT ID:", product.id);
    console.log("==================================");

    const bronze = await createPlan(token, product.id, "Bronze", "25");
    const silver = await createPlan(token, product.id, "Silver", "50");
    const gold = await createPlan(token, product.id, "Gold", "100");

    console.log("==================================");
    console.log("BRONZE PLAN ID:", bronze.id);
    console.log("SILVER PLAN ID:", silver.id);
    console.log("GOLD PLAN ID:", gold.id);
    console.log("==================================");
  } catch (error) {
    console.error("ERROR:", error.message);
  }
}

run();