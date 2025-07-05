const axios = require("axios");
const cheerio = require("cheerio");

const url = 'https://www.moneycontrol.com/news/business/markets/'

async function scrapeNews(){
    try{
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
            },
        });

        const $ = cheerio.load(data);
        const news = [];

        $('#cagetory .clearfix').each((index, element) => {
            const headline = $(element).find('h2 a').text().trim();
            const link = $(element).find('h2 a').attr('href');
            if (headline && link) {
            //   console.log(`(${headline}`);
            //   console.log(`${link}\n`);
                
                news.push({headline, link})
            }
        });
        console.log(news);
        return news;
    }catch (err){
        // console.error('error fetching the news');
        throw new Error(`Error fetching the news: ${err.message}`);
    }
}

module.exports = scrapeNews;