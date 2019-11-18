import * as helpersModule from './helpers';
import * as nasaModule from './nasa-api';
import * as storageModule from './storage';

// breytur til þess að halda utan um html element nodes
let title; // titill fyrir mynd á forsíðu
let text; // texti fyrir mynd á forsíðu
let img; // mynd á forsíðu

let image; // object sem inniheldur núverandi mynd á forsíðu.

function outputMessage(message) {
  const resultsDiv = document.querySelector('.results');
  const errorMessageNode = document.createTextNode(message);
  resultsDiv.appendChild(errorMessageNode);
}

/*
 * Sækir nýja Mynd af handahófi frá Nasa API og birtir hana á forsíðunni
 * ásamt titli og texta.
 */
function getNewImage() {
  console.log('getnewImage()');

  nasaModule.default().then((data) => {
    if (data.length === 0) {
      console.log('No data retrieved from NASA.');
    } else if (data !== null) {
      console.log('data found', data);

      document.querySelector('.apod__image').setAttribute('src', data.hdurl);
      document.querySelector('.apod__title').innerText = data.title;
      document.querySelector('.apod__text').innerText = data.explanation;
    } else {
      console.log('Error getting data.');
    }
  });
}

/*
 * Vistar núverandi mynd í storage.
 */
function saveCurrentImage() {

}

/*
 * Upphafsstillir forsíðuna. Setur event listeners á takkana, og sækir eina mynd.
 *
 */
export default function init(apod) {
  document.getElementById('new-image-button').addEventListener('click', getNewImage);
  document.getElementById('save-image-button').addEventListener('click', saveCurrentImage);
  document.body.getElementsByTagName('a')[0].addEventListener('click', loadFavourites);
}

/*
 * Fall fyrir favourites.html. Sér um að sækja allar vistuðu myndirnar og birta þær ásamt
 * titlum þeirra.
 */
export function loadFavourites() {

}

