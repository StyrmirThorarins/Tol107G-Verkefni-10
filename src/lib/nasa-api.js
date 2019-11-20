import * as helpersModule from './helpers';

/**
 * Sækir Myndir frá nasa API. Til þess að sjá dæmi um json svari sjá apod.json
 */

// API lykill til að fá aðgang að nasa gögnum.
const API_KEY = 'x4xH9ZsI2Tgqu5adds4XrEI3WWKq7tEwXHbsTqvy';
// Slóð að sækja myndir frá. Dæmi um heila slóð https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2019-11-10
const URL = 'https://api.nasa.gov/planetary/apod';

/**
 * Sækir mynd af handahófi frá APOD API hjá nasa
 *
 * @returns {Promise} sem mun innihalda upplýsingar um mynd/myndband hjá nasa.
 */
export default async function getRandomImage() {
  const randomDate = new Date(helpersModule.randomNumber(Date.parse('16 Jun 1995'), Date.now()));
  const requestURL = `${URL}?api_key=${API_KEY}&date=${randomDate.getFullYear()}-${randomDate.getMonth()}-${randomDate.getDay()}`;
  console.log('requestURL: ', requestURL);

  let data = null;

  const result = await fetch(requestURL);

  if (result.status !== 200) {
    console.error('Non 200 status on connecting to NASA server.');
  } else {
    data = await result.json();
  }

  return data;
}

export async function getImageByDate(date) {
  const requestURL = `${URL}?api_key=${API_KEY}&date=${date}`;
  console.log('requestURL: ', requestURL);

  let data = null;

  const result = await fetch(requestURL);

  if (result.status !== 200) {
    console.error('Non 200 status on connecting to NASA server.');
  } else {
    data = await result.json();
  }

  return data;
}
