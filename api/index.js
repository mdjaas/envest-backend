// api/index.js   <-- note the /api folder
const express = require('express');
const cors = require('cors');

const newsRouter   = require('../routers/news');
const marketRouter = require('../routers/market-analysis');

const app = express();
app.use(cors());
app.use(express.json());
app.use(newsRouter);
app.use(marketRouter);

// Only listen when we run locally (e.g. `node api/index.js`)
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Local server on ${port}`));
}

module.exports = app;     
