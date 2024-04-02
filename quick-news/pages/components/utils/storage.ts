import { StorageNewsList, StorageNewsProps } from '@/interfaces/interface'

const CheckInStorage = ({ article, storedNews }: StorageNewsList) => {
  const isAlreadySaved = storedNews?.some((savedItem: StorageNewsProps) => {
    if (article.link && savedItem.link === article.link) {
      return true
    }
    if (article.url && savedItem.url === article.url) {
      return true
    }

    return false
  })

  return isAlreadySaved
}

export const SaveNewsInStorage = ({ article }: StorageNewsList) => {
  const storedNews = JSON.parse(localStorage.getItem('news')!) || []

  const getCheckResult = CheckInStorage({ article, storedNews })

  if (getCheckResult) {
    alert('이미 저장되었습니다.')
  } else {
    storedNews.push(article)
    localStorage.setItem('news', JSON.stringify(storedNews))
    alert('뉴스를 저장했습니다.')
  }
}

const removeNews = (link: string) => {
  const storedNews = JSON.parse(localStorage.getItem('news')!) || []

  const filterNews = storedNews.filter(
    (article: StorageNewsProps) =>
      article.link !== link || article.url !== link,
  )
  localStorage.setItem('news', JSON.stringify(filterNews))
  alert('뉴스가 삭제되었습니다.')
}
