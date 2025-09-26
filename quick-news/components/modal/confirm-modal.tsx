import React from 'react'
import {
  ModalOverlay,
  ModalContent,
  ModalText,
  ModalButtonContainer,
  ModalButton,
} from '../../styles/modal/modal-style'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  message: string
}

function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  message,
}: ConfirmModalProps) {
  if (!isOpen) {
    return null
  }

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalText>{message}</ModalText>
        <ModalButtonContainer>
          <ModalButton onClick={onClose} title="취소">
            취소
          </ModalButton>
          <ModalButton onClick={handleConfirm} title="확인">
            확인
          </ModalButton>
        </ModalButtonContainer>
      </ModalContent>
    </ModalOverlay>
  )
}

export default ConfirmModal
