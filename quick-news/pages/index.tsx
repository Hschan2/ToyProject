import { useQuery } from '@tanstack/react-query'
import NewsLists from './components/NewsLists';
import Seo from './components/Seo'

export default function Home() {

  return (
    <div>
      <Seo title="사회" />
      <NewsLists />
    </div>
  )
}
