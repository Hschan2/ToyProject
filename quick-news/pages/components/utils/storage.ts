import { StorageNewsList, StorageNewsProps } from '@/interfaces/interface'

const CheckInStorage = ({ article, storedNews }: StorageNewsList) => {
  const isAlreadySaved =
    storedNews?.some((savedItem: StorageNewsProps) => {
      return savedItem.link === article.link || savedItem.url === article.url
    }) ?? false

  return isAlreadySaved ? true : false
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
