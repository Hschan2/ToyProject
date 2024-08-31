import { StorageNewsList, StorageNewsProps } from '@/utils/types/type'

const CheckInStorage = ({ article, storedNews }: StorageNewsList) => {
  const isAlreadySaved = storedNews?.some(
    (savedItem: StorageNewsProps) =>
      (article.link && savedItem.link === article.link) ||
      (article.url && savedItem.url === article.url),
  )

  return !!isAlreadySaved
}

export const SaveNewsInStorage = ({ article }: StorageNewsList) => {
  const storedNews = JSON.parse(localStorage.getItem('news') || '[]')

  if (CheckInStorage({ article, storedNews })) {
    alert('이미 저장되었습니다.')
  } else {
    const updatedNews = [...storedNews, article]
    localStorage.setItem('news', JSON.stringify(updatedNews))
    alert('뉴스를 저장했습니다.')
  }
}

export const DeleteNews = (link: string | undefined) => {
  if (!link) {
    console.error('해당 뉴스 링크가 없습니다.')
    return
  }

  const storedNews = JSON.parse(localStorage.getItem('news')!) || []
  const filterNews = storedNews.filter(
    (article: StorageNewsProps) =>
      article.link !== link && article.url !== link,
  )

  localStorage.setItem('news', JSON.stringify(filterNews))
  alert('뉴스가 삭제되었습니다.')
}
