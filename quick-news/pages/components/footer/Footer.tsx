import { FooterContainer, FooterContents } from '../../constants/styledComponents'
import React from 'react'

function Footer() {
    const thisYear = () => {
        return new Date().getFullYear();
    };

    return (
        <FooterContainer>
            <FooterContents>
                <div>It was Developed with NextJS</div>
                <div>Copyright &copy; {thisYear()} HONG SEONGCHAN</div>
            </FooterContents>
        </FooterContainer>
    )
}

export default Footer