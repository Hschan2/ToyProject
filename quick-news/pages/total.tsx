import Footer from './components/footer/Footer';
import NewsSourceList from './components/fetch/NewsSourceList';
import Seo from './components/seo/Seo'
import { Wrapper } from './constants/styledComponents';

export default function Total() {

  return (
    <Wrapper>
      <Seo title="톱 헤드라인" />
      <NewsSourceList />
      <Footer />
    </Wrapper>
  )
}
