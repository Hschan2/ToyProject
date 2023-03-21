import { useQuery } from '@tanstack/react-query'
import Footer from './components/Footer';
import OpenAINews from './components/OpenAiNews';
import Seo from './components/Seo'

export default function Third() {

    return (
        <div className='wrapper'>
            <Seo title="주요 뉴스" />
            <OpenAINews />
            <Footer />
            <style jsx>{`
                .wrapper{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 100vh;
                }
            `}</style>
        </div>
    )
}
