import { atom } from 'recoil'

export const MAX_PAGE_COUNT = 40

export const DARK_MODE_VALUE = atom({
  key: 'darkModeKeyValue',
  default: false,
})

export const ERROR_404 =
  'https://lottie.host/578f80c3-4f56-4f8f-9ec6-07d2b9643fbf/er8xQIFn1f.json'
export const ERROR_500 =
  'https://lottie.host/96d09e5a-d579-4390-8d93-3ae01bb27d0e/Z7C6OZRHli.json'

export const NEWS_CATEGORIES = [
  {
    href: '/',
    category: '',
    title: '주요뉴스',
  },
  {
    href: '/page/total',
    category: 'total',
    title: '종합',
  },
  {
    href: '/page/business',
    category: 'business',
    title: '경제',
  },
  {
    href: '/page/entertainment',
    category: 'entertainment',
    title: '연예',
  },
  {
    href: '/page/sports',
    category: 'sports',
    title: '스포츠',
  },
  {
    href: '/page/technology',
    category: 'technology',
    title: '기술',
  },
  {
    href: '/page/health',
    category: 'health',
    title: '건강',
  },
  {
    href: '/page/science',
    category: 'science',
    title: '과학',
  },
]
