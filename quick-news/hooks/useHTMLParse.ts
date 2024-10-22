function useHTMLParse(title: string) {
  function containsHTML(str: string): boolean {
    const pattern = /<\/?[a-z][\s\S]*>/i
    return pattern.test(str)
  }

  function stripHTML(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    return doc.body.textContent || ''
  }

  return containsHTML(title) ? stripHTML(title) : title
}

export default useHTMLParse
