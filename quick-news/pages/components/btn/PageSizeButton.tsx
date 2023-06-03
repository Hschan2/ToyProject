import React from 'react'
import { useRecoilState } from 'recoil'
import pageSizeAtom from '../../../constants/pageSizeAtom'
import { PageSizesButton } from '../../../styles/styledComponents'

export default function PageSizeButton() {
  const [pageSize, setPageSize] = useRecoilState(pageSizeAtom)

  const handleButtonClick = () => {
    if (pageSize === 40) {
      setPageSize(20)
    } else {
      setPageSize((prevPageSize) => prevPageSize + 10)
    }
  }

  return (
    <PageSizesButton
      onClick={handleButtonClick}
      className="title-tooltip"
      title="뉴스 데이터 개수 선택"
    >
      {pageSize}
    </PageSizesButton>
  )
}
