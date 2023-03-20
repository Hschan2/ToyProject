import { useQuery } from '@tanstack/react-query'
import Footer from './components/Footer';
import NewsApiList from './components/NewsApiList';
import NewsApiProxyTest from './components/NewsApiProxyTest';
import Seo from './components/Seo'

export default function About() {

  return (
    <div>
      <Seo title="주요 뉴스" />
      <NewsApiList />
      <NewsApiProxyTest />
      <Footer />
    </div>
  )
}
