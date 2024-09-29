import React from 'react'
import 'moment/locale/ko'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import ClientNewsComponent from './ClientNewsComponent'
import { NaverNewsProps } from '../../utils/types/type'
import { MAX_PAGE_COUNT } from '../../utils/Constants'

interface NaverPropsRes {
  items: NaverNewsProps[]
}

export const getServerSideProps = (async () => {
  const queryValue = '오늘의주요뉴스'
  const url = `/api/naver-news-proxy?q=${queryValue}&pageCount=${MAX_PAGE_COUNT}`
  const headers: HeadersInit = {
    'X-Naver-Client-Id': process.env.NEXT_PUBLIC_CLIENT_ID!,
    'X-Naver-Client-Secret': process.env.NEXT_PUBLIC_CLIENT_SECRET!,
  }

  const res = await fetch(url, {
    headers,
  })

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error('페이지를 찾을 수 없습니다.')
    } else if (res.status >= 500) {
      throw new Error('서버 오류가 발생했습니다.')
    } else {
      throw new Error(`뉴스 데이터를 가져오지 못했습니다. ${res.status}`)
    }
  }

  const repo: NaverPropsRes = await res.json()
  return {
    props: { items: repo.items },
    revalidate: 60,
  }
}) satisfies GetServerSideProps<{ items: NaverNewsProps[] }>

export default function NewsLists({
  items,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <ClientNewsComponent initialNews={items} initialPageSize={10} />
}
