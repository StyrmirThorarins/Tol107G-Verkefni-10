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
  } catch {
    console.log('No image found to remove.');
  }

  try {
    apodNode.querySelector('div').remove();
  } catch {
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
  /*
  let imagePath = '';
  let title = '';
  try {
    imagePath = document.querySelector('.apod__image').getAttribute('src');
    title = document.querySelector('.apod__title').innerHTML;    
  } catch {
    console.log('No image found. Possibly you tried to save a video.');
  }
*/
  if (image.media_type === 'image') {    
    localStorage.setItem(`apodImageUrl-${localStorage.length + 1}`, image.hdurl);
    localStorage.setItem(`apodImageTitle-${localStorage.length + 1}`, image.title);
    console.log('Image saved to favorites.')
  } else if (image.media_type === 'video') {
    console.log('Videos can not be saved to favorites.');
  }
}

/*
 * Upphafsstillir forsíðuna. Setur event listeners á takkana, og sækir eina mynd.
 *
 */
export default function init(apod) {
  document.getElementById('new-image-button').addEventListener('click', getNewImage);
  document.getElementById('save-image-button').addEventListener('click', saveCurrentImage);
  // document.body.getElementsByTagName('a')[0].addEventListener('click', loadFavourites);
}

/*
 * Fall fyrir favourites.html. Sér um að sækja allar vistuðu myndirnar og birta þær ásamt
 * titlum þeirra.
 */
export function loadFavourites() {  
  // localStorage.clear();
  
  let appendNode = document.querySelector('h1');  

  for (let n=1; n <= localStorage.length; n += 1) {      
    console.log(`apodImageUrl-${n}`, localStorage.getItem(`apodImageUrl-${n}`));        
    console.log(`apodImageTitle-${n}`, localStorage.getItem(`apodImageTitle-${n}`));

    
    const titleNode = helpersModule.el('h2');
    titleNode.innerHTML = localStorage.getItem(`apodImageTitle-${n}`);

    const imageNode = helpersModule.el('img');
    imageNode.classList.add('apod__image');
    imageNode.setAttribute('src', localStorage.getItem(`apodImageUrl-${n}`));

    appendNode.appendChild(titleNode);
    appendNode.appendChild(imageNode);    
  }
}
