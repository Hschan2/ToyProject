import React, { useRef } from 'react'
import { Player } from '@lottiefiles/react-lottie-player';

type LottieProps = {
    srcLink: string;
    style?: string;
}

/**
 * Lottiefiles 애니메이션 컴포넌트
 * Lottiefiles 출처: https://lottiefiles.com/
 * @returns 
 */
function LottieFiles({ srcLink, style }: LottieProps) {
    const container = useRef(null);

    return (
        <Player
            ref={container.current}
            autoplay
            loop
            src={srcLink}
            className={style}
        />
    )
}

export default LottieFiles