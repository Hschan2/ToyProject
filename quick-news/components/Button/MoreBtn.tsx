import React from 'react'
import { MoreButton } from '../../styles/ButtonStyle'
import { MoreButtonProps } from '../../utils/types/type'

export default function MoreViewButton({
  onClick,
  disabled,
  children,
}: MoreButtonProps) {
  return (
    <MoreButton
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label="더보기"
    >
      {children}
    </MoreButton>
  )
}
