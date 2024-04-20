import { atom } from 'recoil'

export const MAX_PAGE_COUNT = 40

export const DARK_MODE_VALUE = atom({
  key: 'dark_mode_key',
  default: false,
})
