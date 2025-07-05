const express = require('express');
const cors = require('cors');

const newsRouter = require('../src/routers/news');
const marketRouter = require('../src/routers/market-analysis');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/news', newsRouter);               // ✅ Mount at correct path
app.use('/market-analysis', marketRouter);

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Local server on ${port}`));
}

module.exports = app;
