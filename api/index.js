const express = require('express');
const cors = require('cors');

const newsRouter = require('../src/routers/news');
const marketRouter = require('../src/routers/market-analysis');

const app = express();
app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());

app.use('/news', newsRouter);            
app.use('/market-analysis', marketRouter);

app.get('/', (req, res) => {
  res.json({ message: 'API is working!' });
});

if (require.main === module) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Local server on ${port}`));
}

module.exports = app;
