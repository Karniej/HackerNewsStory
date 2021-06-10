export const urlShortener = (urlToShort: string) => {
  let shortenedUrl: string | string[] = urlToShort
  if (urlToShort?.includes('www')) {
    //remove www from url
    shortenedUrl = urlToShort.split('www')
  } else if (urlToShort?.includes('https://')) {
    //remove https:// from the link
    shortenedUrl = urlToShort.split('https://')
  } else if (urlToShort?.includes('http://')) {
    //remove http:// from the link
    shortenedUrl = urlToShort.split('http://')
  }

  //remove dot if existts   in url
  if (shortenedUrl && shortenedUrl[1].startsWith('.')) {
    shortenedUrl = shortenedUrl[1].slice(shortenedUrl.indexOf('.') + 2)
  }

  return `(${shortenedUrl.slice(0, shortenedUrl.indexOf('/'))})`
}
