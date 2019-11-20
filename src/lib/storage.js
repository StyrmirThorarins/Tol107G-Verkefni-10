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
  //son  localStorage.clear();
  console.log('localStorage', localStorage);

  const savedMedia = [];

  for (let n = 1; n <= localStorage.length; n += 1) {
    const jsonString = localStorage.getItem(`${LOCALSTORAGE_KEY}-${n}`);
    const mediaItem = JSON.parse(jsonString);

    console.log('loaded items', `${LOCALSTORAGE_KEY}-${n}`, jsonString, mediaItem);

    savedMedia[n][0] = mediaItem.type;
    savedMedia[n][1] = mediaItem.mediaUrl;
    savedMedia[n][2] = mediaItem.text;
    savedMedia[n][3] = mediaItem.url;
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

  // json example {"firstName":"John", "lastName":"Doe"},
  localStorage.setItem(`${LOCALSTORAGE_KEY}-${position}`, `{'type':'${type}','mediaUrl:'${mediaUrl}','text':"${text}", 'title':'${title}'}`);

  /*
  localStorage.setItem(`${LOCALSTORAGE_KEY}-type-${position}`, type);
  localStorage.setItem(`${LOCALSTORAGE_KEY}-mediaUrl-${position}`, mediaUrl);
  localStorage.setItem(`${LOCALSTORAGE_KEY}-text-${position}`, text);
  localStorage.setItem(`${LOCALSTORAGE_KEY}-title-${position}`, title);
  */
  console.log('Media saved to favorites.');
}


/**
 * Hreinsar allar myndir úr localStorage
 */
export function clear() {
  localStorage.removeItem(LOCALSTORAGE_KEY);
}
