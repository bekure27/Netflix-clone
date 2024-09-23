
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
app.use(express.json());
// app.use(cors({ origin: "http://localhost:5173" }));

// app.use(cors({ origin: "https://netflix-frontend-five.vercel.app" }));

app.use(cors({ origin: "https://netflix-frontend-xbia.onrender.com" }));

const stripeApiKey = process.env.STRIPE_SECRET_KEY;



let paymentLink;

app.get('/',(req,res) => res.send("abebe"))

app.post("/api/create-subscription", async (req, res) => {
  const { plan, email } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: email,
    });

    let items = [];

    switch (plan) {
      case "monthly":
        items.push({
          price: process.env.MONTHLY_SUBSCRIPTION_PRICE_ID,
          quantity: 1,
        });
        break;
      case "annual":
        items.push({
          price: process.env.ANNUAL_SUBSCRIPTION_PRICE_ID,
          quantity: 1,
        });
        break;

      default:
        return res.status(400).json({ error: "Invalid plan selection" });
    }


    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ["card"],
      line_items: items,
      mode: "subscription",
      // success_url: "http://localhost:5173/home",
      // cancel_url: "http://localhost:5173/",
      // success_url: "https://netflix-frontend-five.vercel.app/home",
      // cancel_url: "https://netflix-frontend-five.vercel.app/",
      success_url: "https://netflix-frontend-xbia.onrender.com/home",
      cancel_url: "https://netflix-frontend-xbia.onrender.com/",
    });

    res.json({ paymentLink: session.url });

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


