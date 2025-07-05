const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.GPT_API_KEY,
});

// const headlines = [
//   "Infosys faces data breach investigation",
//   "Sensex ends flat amid global uncertainty"
// ];

async function analyzeSentiment(headlines = []) {
    if (!Array.isArray(headlines) || headlines.length === 0) {
      throw new Error("headlines must be a non‑empty array");
    }
  
    const prompt = `Analyze the following news headlines and classify each as "Positive", "Negative", or "Neutral":
  
  ${headlines.map((h, i) => `${i + 1}. ${h}`).join("\n")}
  
  Respond ONLY with the classification for each headline, one per line, exactly like:
  1. Positive
  2. Neutral
  3. Negative`;
  
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",            
      messages: [
        {
          role: "system",
          content:
            "You are a financial news sentiment analysis assistant. Respond only in the requested format.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 150,
      temperature: 0.2,
    });
  
    return completion.choices[0].message.content.trim();
  }
  
  module.exports = analyzeSentiment;