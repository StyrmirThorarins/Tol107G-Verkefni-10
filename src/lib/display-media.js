import * as helpersModule from './helpers';
import * as nasaModule from './nasa-api';
import * as storageModule from './storage';

// breytur til þess að halda utan um html element nodes
let title; // titill fyrir mynd á forsíðu
let text; // texti fyrir mynd á forsíðu
let img; // mynd á forsíðu
let videoURL; // url to video if any

let image; // object sem inniheldur núverandi mynd á forsíðu.

// attempts to remove image or video from page
function removeMediaNode(apodNode) {
  try {
    apodNode.querySelector('.apod__image').remove();
  } catch (e) {
    console.log('No image found to remove.');
  }

  try {
    apodNode.querySelector('div').remove();
  } catch (e) {
    console.log('No video found to remove.');
  }
}

/*
 * Sækir nýja Mynd af handahófi frá Nasa API og birtir hana á forsíðunni
 * ásamt titli og texta.
 */
function getNewImage() {
  nasaModule.default().then((data) => {
    if (data === null) {
      console.log('No data retrieved from NASA.');
    } else if (data !== null) {
      console.log('Data retrieved from NASA', data);

      image = data;
      title = data.title;
      text = data.explanation;
      img = data.hdurl;
      videoURL = data.url;

      const apodNode = document.querySelector('.apod');
      const titleNode = document.querySelector('.apod__title');
      removeMediaNode(apodNode);

      if (data.media_type === 'image') {
        const imageNode = helpersModule.el('img');
        imageNode.classList.add('apod__image');
        imageNode.setAttribute('src', img);
        titleNode.before(imageNode);
      } else if (data.media_type === 'video') {
        const vidDivNode = helpersModule.el('div');
        vidDivNode.innerHTML = `<iframe width='560' height='315' src='${videoURL}' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>`;

        titleNode.before(vidDivNode);
      }

      document.querySelector('.apod__title').innerText = title;
      document.querySelector('.apod__text').innerText = text;
    } else {
      console.log('Error getting data.');
    }
  });
}

/*
 * Vistar núverandi mynd í storage.
 */
function saveCurrentImage() {
  if (image != null) {
    storageModule.save(image.media_type, image.url, image.explanation, image.title);
  } else {
    console.log('You need to load media from NASA before attempting to save.');
  }
}

/*
 * Upphafsstillir forsíðuna. Setur event listeners á takkana, og sækir eina mynd.
 *
 */
export default function init() {
  document.getElementById('new-image-button').addEventListener('click', getNewImage);
  document.getElementById('save-image-button').addEventListener('click', saveCurrentImage);
}

/*
 * Fall fyrir favourites.html. Sér um að sækja allar vistuðu myndirnar og birta þær ásamt
 * titlum þeirra.
 */
export function loadFavourites() {
  const savedMedia = storageModule.load();

  const appendNode = document.querySelector('h1');

  for (let n = 0; n < savedMedia.length; n += 1) {
    const titleNode = helpersModule.el('h2');
    const titleText = savedMedia[n][3];
    titleNode.innerHTML = titleText;

    const imageNode = helpersModule.el('img');
    imageNode.classList.add('apod__image');
    imageNode.setAttribute('src', savedMedia[n][1]);

    appendNode.appendChild(titleNode);
    appendNode.appendChild(imageNode);
  }
}
