import React from 'react'
import {
  FooterContainer,
  FooterContents,
} from '../../styles/footer/footer-style'

function Footer() {
  const thisYear = new Date().getFullYear()

  return (
    <FooterContainer>
      <FooterContents>
        <div>It was Developed with NextJS</div>
        <div>Copyright &copy; {thisYear} HONG SEONGCHAN</div>
      </FooterContents>
    </FooterContainer>
  )
}

export default Footer
