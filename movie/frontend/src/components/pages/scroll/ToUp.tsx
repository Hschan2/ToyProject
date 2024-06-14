import { useEffect, useState } from 'react';
import { UpTopButton } from '../../../style/Scroll';

/**
 * 상단으로 이동 버튼 컴포넌트
 * @showButton Boolean으로 특정 위치에서 버튼 보이기/가리기 설정
 * @returns showButton이 true일 경우 버튼 출력
 */
function ToTop() {
    const [showTopButton, setShowTopButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 300) {
                setShowTopButton(true);
            } else {
                setShowTopButton(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <div>
            {showTopButton && (
                <UpTopButton onClick={scrollToTop}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06l-2.47-2.47V21a.75.75 0 0 1-1.5 0V4.81L8.78 7.28a.75.75 0 0 1-1.06-1.06l3.75-3.75Z" clipRule="evenodd" />
                    </svg>
                </UpTopButton>
            )}
        </div>
    )
}

export default ToTop