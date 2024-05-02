import React from 'react'
import { FooterContainer, Footer } from '../../../style/Footer';

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
            <Footer>
                <p>It was Developed with React and Spring</p>
                <p>Copyright &copy; {getCurrentYear()}</p>
            </Footer>
        </FooterContainer>
    )
}

export default Footer