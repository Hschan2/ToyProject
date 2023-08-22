import Footer from './components/footer/Footer'
import NewsSourceList from './components/fetch/NewsSourceList'
import Seo from './components/seo/Seo'
import { Wrapper } from '../styles/PageStyle'

export default function Technology() {
  return (
    <Wrapper>
      <Seo title="테크" />
      <NewsSourceList category="technology" />
      <Footer />
    </Wrapper>
  )
}
