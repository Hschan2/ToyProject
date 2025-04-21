import React, { useEffect, useState } from 'react'
import {
  ModalButton,
  ModalButtonContainer,
  ModalContent,
  ModalOverlay,
  ModalText,
} from '../../styles/modal/modal-style'

function NotificationModal() {
  const [showModal, setShowModal] = useState(false)

  const closeModal = () => {
    setShowModal(false)
    localStorage.setItem('modalShown', 'true')
  }

  useEffect(() => {
    const modalShown = localStorage.getItem('modalShown')
    if (!modalShown) {
      setShowModal(true)
    }
  }, [])

  if (!showModal) {
    return null
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalText>
          무료 API 사용으로 배포 서비스에는 데이터가 출력되지 않습니다.
        </ModalText>
        <ModalButtonContainer>
          <ModalButton onClick={closeModal} title="확인 완료">
            확인
          </ModalButton>
        </ModalButtonContainer>
      </ModalContent>
    </ModalOverlay>
  )
}

export default NotificationModal
