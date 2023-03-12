import { useQuery } from '@tanstack/react-query'
import Footer from './components/Footer';
import OpenAINews from './components/OpenAiNews';
import Seo from './components/Seo'

export default function Third() {

    return (
        <div>
            <Seo title="주요 뉴스" />
            <OpenAINews />
            <Footer />
        </div>
    )
}
