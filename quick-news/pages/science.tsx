import Footer from './components/footer/Footer'
import NewsSourceList from './components/fetch/NewsSourceList'
import Seo from './components/seo/Seo'
import { Wrapper } from './constants/styledComponents'

export default function Science() {
  return (
    <Wrapper>
      <Seo title="과학" />
      <NewsSourceList category="science" />
      <Footer />
    </Wrapper>
  )
}
