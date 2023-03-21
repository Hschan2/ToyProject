import { useQuery } from '@tanstack/react-query'
import { Suspense } from 'react';
import Footer from './components/Footer';
import NewsApiList from './components/NewsApiList';
import NewsApiProxyTest from './components/NewsApiProxyTest';
import Seo from './components/Seo'

export default function About() {

  return (
    <div className='wrapper'>
      <Seo title="주요 뉴스" />
      <Suspense fallback={<div>Loading...</div>}>
        <NewsApiList />
      </Suspense>
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
