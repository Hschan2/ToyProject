import Footer from './components/footer/Footer'
import NewsSourceList from './components/fetch/NewsSourceList'
import Seo from './components/seo/Seo'
import { Wrapper } from './constants/styledComponents'

export default function Health() {
  return (
    <Wrapper>
      <Seo title="건강" />
      <NewsSourceList category="health" />
      <Footer />
    </Wrapper>
  )
}
