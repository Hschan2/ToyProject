import React from 'react'
import { Link } from 'react-router-dom'
import { MAIN_BANNER_LOTTIE } from '../../constants/LottiefilesSrc'
import { LogoContainer, LogoAnimation, LottieAnimation, LogoTitle } from '../../../style/Nav';

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