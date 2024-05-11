import React from 'react'
import { FooterContainer, FooterContents } from '../../../style/Footer';

/**
 * 페이지 하단 컨텐츠 컴포넌트
 * @thisYear 올해(2022년) 값 변수
 */
function Footer() {
    const getCurrentYear = () => {
        return new Date().getFullYear();
    };

    return (
        <FooterContainer>
            <FooterContents>
                <span>Developed with React and Spring Boot.</span>
                <span>Copyright &copy; {getCurrentYear()} by Hong</span>
            </FooterContents>
        </FooterContainer>
    )
}

export default Footer