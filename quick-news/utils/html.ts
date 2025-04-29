export const StripHtmlTags = (html: string) => {
  if (typeof html !== 'string') return ''

  const replaceHtmlTags = html.replace(/<\/?[^>]+>/gi, '')
  const txt = document.createElement('textarea')
  txt.innerHTML = replaceHtmlTags
  return txt.value
}
