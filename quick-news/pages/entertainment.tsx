import Footer from './components/footer/Footer'
import NewsSourceList from './components/fetch/NewsSourceList'
import Seo from './components/seo/Seo'
import { Wrapper } from '../styles/styledComponents'

export default function Entertainment() {
  return (
    <Wrapper>
      <Seo title="연예" />
      <NewsSourceList category="entertainment" />
      <Footer />
    </Wrapper>
  )
}
