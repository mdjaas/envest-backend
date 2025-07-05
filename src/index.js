const express = require('express');
const cors = require('cors');

const newsRouter = require('./routers/news');
const marketRouter = require('./routers/market-analysis');

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(newsRouter);
app.use(marketRouter);

app.listen(port, () => {
    console.log("Connected to port", port);
})