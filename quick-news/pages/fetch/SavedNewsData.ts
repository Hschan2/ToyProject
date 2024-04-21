function SavedNewsData(pageSize: number) {
  const savedArticles = JSON.parse(localStorage.getItem('news')!) || []

  const visibleNews = savedArticles?.slice().reverse().slice(0, pageSize)

  return { visibleNews }
}

export default SavedNewsData
