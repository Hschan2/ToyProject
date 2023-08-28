import { atom } from 'recoil'

export const searchState = atom<string>({
  key: 'searchTermState',
  default: '',
})
