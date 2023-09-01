import { atom } from 'recoil'

export const SeoState = atom<string>({
  key: 'seoState',
  default: '',
})
