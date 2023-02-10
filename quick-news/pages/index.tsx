import { useQuery } from '@tanstack/react-query'
import { getNewsListResult, NewsList } from './api/getNewsList';
import NewsLists from './components/NewsLists';
import Seo from './components/Seo'

export default function Home() {
  // const { data, isLoading, error } = useQuery<getNewsListResult>(["news"], NewsList);
  const { data: nData, isLoading: isNLoading, error: nError } = useQuery<getNewsListResult>(
    ["news"],
    NewsList
  );

  if (isNLoading) return 'Loading...'
  if (nError) return '에러 발생: ' + nError

  return (
    <div>
      <Seo title="사회" />
      <NewsLists data={nData} />
    </div>
  )
}
