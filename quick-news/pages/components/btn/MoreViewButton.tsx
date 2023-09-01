import React from 'react'
import { MoreButton } from '../../../styles/ButtonStyle'
import { MoreButtonProps } from '../../../interfaces/Interfaces'

export default function MoreViewButton({
  onClick,
  disabled,
  children,
}: MoreButtonProps) {
  return (
    <MoreButton type="button" onClick={onClick} disabled={disabled}>
      {children}
    </MoreButton>
  )
}
