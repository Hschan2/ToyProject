import { useQuery } from '@tanstack/react-query'
import Footer from './components/Footer';
import NewsLists from './components/NewsLists';
import Seo from './components/Seo'

export default function Home() {

  return (
    <div>
      <Seo title="사회" />
      <NewsLists />
      <Footer />
    </div>
  )
}
