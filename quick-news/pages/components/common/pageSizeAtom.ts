import { atom } from 'recoil'

const pageSizeAtom = atom<number>({
  key: 'pageSize',
  default: 20,
})

export default pageSizeAtom
