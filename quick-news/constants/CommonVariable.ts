import { atom } from 'recoil'

export const MAX_PAGE_COUNT = 40

export const DARK_MODE_VALUE = atom({
  key: 'darkMode',
  default: false,
})
