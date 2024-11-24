const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_KEY);
// console.log(stripe);
const port = 3000;
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json("Hello World");
});


app.post("/payment.create", async (req, res) => {
  const total = req.query.total; 
  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
    
  } else {
    res.status(401).json({
      message: "total must be grater than 0",
    });
  }
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is running on port ${port}`);
});

// exports.api = onRequest(app);
