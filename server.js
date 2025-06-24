const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/send-otp", async (req, res) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({ status: "error", message: "Missing phone or OTP" });
  }

  const message = encodeURIComponent(
    `Your OTP is: ${otp}\nUse this One Time Password to log in to your account.\nThis OTP is valid for 5 minutes.\nDo not share it with anyone.\n\nRegards\nSTARVEDA`
  );

  const apiUrl = `https://api.zapsms.co.in/api/v2/SendSMS?SenderId=STRVDA&Is_Unicode=false&Is_Flash=false&Message=${message}&MobileNumbers=${phone}&ApiKey=P1hytytuNMxZyx7bDJZat7dyJrGd9LamVzXtZQKXy7k%3D&ClientId=1e3384c2-4815-4955-8b8e-9400b0de4782&DLT_TE_ID=1207174496756481748`;

  try {
    console.log("Sending to:", apiUrl);
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log("ZapSMS Response:", data);
    res.json(data);
  } catch (err) {
    console.error("Send OTP Error:", err);
    res.status(500).json({ status: "error", message: "Failed to send OTP", error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`OTP proxy server running on port ${PORT}`));
