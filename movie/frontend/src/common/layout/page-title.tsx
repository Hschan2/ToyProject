import { Link } from 'react-router-dom'
import { MAIN_BANNER_LOTTIE } from '../loading/constants/loading-error-link'
import { LogoContainer, LogoAnimation, LottieAnimation, LogoTitle } from '../nav/style/nav-style';

function TitleImage() {
    return (
        <Link to="/">
            <LogoContainer>
                <LogoAnimation>
                    <LottieAnimation srcLink={MAIN_BANNER_LOTTIE} />
                </LogoAnimation>
                <LogoTitle>MOVIE</LogoTitle>
            </LogoContainer>
        </Link>
    )
}

export default TitleImage