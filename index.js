import request from 'request-promise';
import { load } from 'cheerio';

const URL = 'https://www.imdb.com/title/tt4633694/?ref_=nv_sr_2?ref_=nv_sr_2';

(async() => {
  const response = await request(URL);
  let $ = load(response);

  let title = $('div[class="title_wrapper"] > h1').text();
  let rating = $('span[itemprop="ratingValue"]').text();

  console.log(title, rating);
})()