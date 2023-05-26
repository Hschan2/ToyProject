import Footer from './components/footer/Footer'
import NewsLists from './components/fetch/NewsLists'
import Seo from './components/seo/Seo'
import { Wrapper } from '../styles/styledComponents'

export default function Home() {
  return (
    <Wrapper>
      <Seo title="오늘의 주요뉴스" />
      <NewsLists />
      <Footer />
    </Wrapper>
  )
}
