export const StripHtmlTags = (html: string) => {
  const replaceHtmlTags = html.replace(/<\/?[^>]+>/gi, '')
  const txt = document.createElement('textarea')
  txt.innerHTML = replaceHtmlTags
  return txt.value
}
