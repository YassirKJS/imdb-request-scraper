const request = require('request-promise');
const cheerio = require('cheerio');

const URL = 'https://www.imdb.com/title/tt4633694/?ref_=nv_sr_2?ref_=nv_sr_2';

(async() => {
  //const response = await request(URL);
  const response = await request({
    uri: URL,
    headers: {
      'authority': 'www.imdb.com',
      'method': 'GET',
      'path': '/title/tt4633694/?ref_=nv_sr_2?ref_=nv_sr_2',
      'scheme': 'https',
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'en-US,en;q=0.9',
      'cache-control': 'no-cache',
      'pragma': 'no-cache',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'none',
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': '1',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
    },
    gzip: true, // imdb is using gzip compression
  });

  let $ = cheerio.load(response);

  let title = $('div[class="title_wrapper"] > h1').text();
  let rating = $('span[itemprop="ratingValue"]').text();

  console.log(title, rating);
})()