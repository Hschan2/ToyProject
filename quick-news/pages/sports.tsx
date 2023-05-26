import Footer from './components/footer/Footer'
import NewsSourceList from './components/fetch/NewsSourceList'
import Seo from './components/seo/Seo'
import { Wrapper } from '../styles/styledComponents'

export default function Sports() {
  return (
    <Wrapper>
      <Seo title="스포츠" />
      <NewsSourceList category="sports" />
      <Footer />
    </Wrapper>
  )
}
