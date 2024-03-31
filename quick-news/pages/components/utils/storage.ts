import { NaverNewsList, NaverNewsProps } from '@/interfaces/interface'

const storedNews = JSON.parse(localStorage.getItem('news')!) || []

const CheckInLocalStorage = ({ article }: NaverNewsList) => {
  const isAlreadySaved = storedNews.some(
    (savedItem: NaverNewsProps) => savedItem.link === article.link,
  )

  return isAlreadySaved ? true : false
}

export const SaveNews = ({ article }: NaverNewsList) => {
  const getCheckValue = CheckInLocalStorage({ article })

  if (getCheckValue) {
    alert('이미 저장되었습니다.')
  } else {
    storedNews.push(article)
    localStorage.setItem('news', JSON.stringify(storedNews))
    alert('뉴스를 저장했습니다.')
  }
}

const removeNews = (newsId: string) => {
  const filterNews = storedNews.filter(
    (article: NaverNewsProps) => article.link !== article.link,
  )
  localStorage.setItem('news', JSON.stringify(filterNews))
  alert('뉴스가 삭제되었습니다.')
}
