// routes/market-analysis.js
const express = require("express");
const analyzeSentiment = require("../services/gpt");

const router = new express.Router();

/* ------------------------------------------------------------------ */
/*  POST /market-analysis   body = [{ headline, ... }, ...]           */
/*  Returns { sentiment: ["Positive", "Neutral", ...] }               */
/* ------------------------------------------------------------------ */
router.post("/", async (req, res) => {
  try {
    const newsItems = req.body;

    if (!Array.isArray(newsItems) || newsItems.length === 0) {
      return res
        .status(400)
        .json({ error: "Request body must be a non‑empty array." });
    }

    /* Extract headlines */
    const headlines = newsItems.map((item) => item.headline);

    /* One OpenAI call for all headlines */
    const raw = await analyzeSentiment(headlines);         // string
    console.log("OpenAI raw reply:\n", raw);

    /* Parse "1. Positive" → "Positive" */
    const sentimentResults = raw.split("\n").map((line) => {
      const m = line.match(/\d+\.\s*(Positive|Negative|Neutral)/i);
      return m ? m[1] : "Unknown";
    });

    return res.json({ sentiment: sentimentResults });
  } catch (err) {
    console.error("Sentiment analysis failed:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
