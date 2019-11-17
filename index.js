const request = require('request-promise');
const cheerio = require('cheerio');

const URLS = [
  'https://www.imdb.com/title/tt4633694/?ref_=nv_sr_2?ref_=nv_sr_2',
  'https://www.imdb.com/title/tt7286456/?ref_=nv_sr_1?ref_=nv_sr_1'
];

(async() => {
  for (let url of URLS) {
    const response = await request({
      uri: url,
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
  
    let title = $('div[class="title_wrapper"] > h1').text().trim();
    let rating = $('span[itemprop="ratingValue"]').text();
    let poster = $('div[class="poster"] > a > img').attr('src');
    let releaseDate = $('a[title="See more release dates"]').text().trim();
    let genres = [];
    $('div[class="title_wrapper"] a[href^="/search/"]').each((index, elm) => {
      let genre = $(elm).text();
      genres.push(genre);
    });
  
    console.log('title:', title);
    console.log('rating:', rating);
    console.log('poster:', poster);
    console.log('releaseDate:', releaseDate);
    console.log('genres:', genres);
  }
})()