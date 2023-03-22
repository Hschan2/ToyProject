import Footer from './components/Footer';
import OpenAINews from './components/OpenAiNews';
import Seo from './components/Seo'
import { Wrapper } from './constants/styledComponents';

export default function Third() {

    return (
        <Wrapper>
            <Seo title="주요 뉴스" />
            <OpenAINews />
            <Footer />
        </Wrapper>
    )
}
