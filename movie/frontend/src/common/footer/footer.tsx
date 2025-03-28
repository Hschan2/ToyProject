import { FooterContainer, FooterContents } from './style/footer-style';

/**
 * 페이지 하단 컨텐츠 컴포넌트
 * @thisYear 올해(2024년) 값 변수
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