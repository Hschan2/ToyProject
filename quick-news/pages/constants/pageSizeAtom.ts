import { atom } from 'recoil'

export const pageSizeAtom = atom<number>({
  key: 'pageSize',
  default: 20,
})
