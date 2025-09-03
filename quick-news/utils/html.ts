export const StripHtmlTags = (html: string): string => {
  if (typeof window === 'undefined' || typeof html !== 'string') {
    return html
  }

  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent || ''
}
