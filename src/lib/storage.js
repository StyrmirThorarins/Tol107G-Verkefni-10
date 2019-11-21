/**
 * Sækir og vistar í localStorage
 */

// Fast sem skilgreinir heiti á lykli sem vistað er undir í localStorage
const LOCALSTORAGE_KEY = 'favourite_spacephotos';

/**
 * Sækir gögn úr localStorage. Skilað sem lista á forminu:
 * [{ type, mediaUrl, text, title },
 *  { type, mediaUrl, text, title },
 *  ...,
 *  { type, mediaUrl, text, title }]
 *
 * @returns {array} fylki af myndum eða tóma fylkið ef ekkert vistað.
 */
export function load() {
  // localStorage.clear();
  console.log('localStorage: ', localStorage);
  const savedMedia = [];

  for (let n = 1; n <= localStorage.length; n += 1) {
    const mediaJSON = localStorage.getItem(`${LOCALSTORAGE_KEY}-${n}`);
    const mediaObj = JSON.parse(mediaJSON);

    const mediaItem = new Array(4);
    mediaItem[0] = mediaObj.type;
    mediaItem[1] = mediaObj.mediaUrl;
    mediaItem[2] = mediaObj.text;
    mediaItem[3] = mediaObj.title;

    savedMedia.push(mediaItem);
  }

  return savedMedia;
}

/**
 * Vistaðar myndir með texta.
 *
 * @param {string} type annað hvort image eða video
 * @param {string} mediaUrl URL á myndinni/myndbandinu.
 * @param {string} text texti fyrir myndina/myndbandið.
 * @param {string} title titill fyrir myndina/myndbandið.
 */
export function save(type, mediaUrl, text, title) {
  const position = localStorage.length + 1;

  const mediaJSON = `{"type": "${type}", "mediaUrl": "${mediaUrl}", "text": "${text}", "title": "${title}"}`;
  localStorage.setItem(`${LOCALSTORAGE_KEY}-${position}`, mediaJSON);

  console.log('Media saved to favorites.');
}


/**
 * Hreinsar allar myndir úr localStorage
 */
export function clear() {
  localStorage.removeItem(LOCALSTORAGE_KEY);
}
