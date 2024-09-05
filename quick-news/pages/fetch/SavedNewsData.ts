function SavedNewsData(pageSize: number) {
  const getSavedArticles = localStorage.getItem('news')
  const savedArticles = getSavedArticles ? JSON.parse(getSavedArticles) : []

  const visibleNews = savedArticles?.slice().reverse().slice(0, pageSize)

  return { visibleNews }
}

export default SavedNewsData
