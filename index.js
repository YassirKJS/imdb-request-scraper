const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const { Parser } = require('json2csv');

const URLS = [
  'https://www.imdb.com/title/tt4633694/?ref_=nv_sr_2?ref_=nv_sr_2',
  'https://www.imdb.com/title/tt7286456/?ref_=nv_sr_1?ref_=nv_sr_1'
];

(async() => {
  let moviesData = [];
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

    moviesData.push({
      title: title,
      rating: rating,
      releaseDate: releaseDate,
      genres: genres,
      poster: poster
    });
  }
  // write data to csv then write it to csv file
  const json2csvParser = new Parser();
  const csv = json2csvParser.parse(moviesData);
  fs.writeFileSync('./moviesdata.csv', csv, 'utf-8'); 

  // convert array into json string and save it to json file
  //fs.writeFileSync('./moviesdata.json', JSON.stringify(moviesData), 'utf-8'); 

  console.log(csv);
})()