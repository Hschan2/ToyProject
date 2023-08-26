import Footer from './components/footer/Footer'
import Seo from './components/seo/Seo'
import { Wrapper } from '../styles/PageStyle'
import SearchNews from './components/page/SearchNews'

export default function Search() {
  return (
    <Wrapper>
      <Seo title="뉴스 검색" />
      <SearchNews />
      <Footer />
    </Wrapper>
  )
}
