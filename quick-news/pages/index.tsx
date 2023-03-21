import { useQuery } from '@tanstack/react-query'
import { Suspense } from 'react';
import Footer from './components/Footer';
import NewsLists from './components/NewsLists';
import Seo from './components/Seo'

export default function Home() {

  return (
    <div className='wrapper'>
      <Seo title="사회" />
      <Suspense fallback={<div>Loading...</div>}>
        <NewsLists />
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
