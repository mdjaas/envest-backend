const express = require('express');

const News = require('../scrappers/stock-news');

const router = new express.Router();

router.get('/', async (req, res) => {
    try{
        const news = await News();
        res.send(news);
        
    }catch(err){
        res.send(err);
    }
})

module.exports = router