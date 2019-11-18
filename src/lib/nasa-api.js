/**
 * Sækir Myndir frá nasa API. Til þess að sjá dæmi um json svari sjá apod.json
 */

// API lykill til að fá aðgang að nasa gögnum.
const API_KEY = 'x4xH9ZsI2Tgqu5adds4XrEI3WWKq7tEwXHbsTqvy';
// Slóð að sækja myndir frá. Dæmi um heila slóð https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2019-11-10
const URL = 'https://api.nasa.gov/planetary/apod';

// generate a random date between two given dates
function getRandomDate(start, end) {
  const date = new Date(+start + Math.random() * (end - start));
  return date;
}

/**
 * Sækir mynd af handahófi frá APOD API hjá nasa
 *
 * @returns {Promise} sem mun innihalda upplýsingar um mynd/myndband hjá nasa.
 */
export default async function getRandomImage() {
  // https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2019-11-13

  // const randomDate = getRandomDate(Date.parse('16-06-1995'), Date.now());
  // const requestKey = `${URL}?api-key=${API_KEY}&date=${randomDate}`;
  let requestURL = `${URL}?api-key=${API_KEY}&date=2014-22-02`;
  requestURL = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2019-11-13';

  let data = null;

  const result = await fetch(requestURL);

  if (result.status !== 200) {
    console.error('Non 200 status');
  } else {
    data = await result.json();
  }

  return data;
}
