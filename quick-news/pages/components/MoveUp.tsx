import React, { useEffect, useState } from 'react'
import { FaArrowCircleUp } from 'react-icons/fa';
import { UpButton } from '../constants/styledComponents';

export default function MoveUp() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 200) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {showButton && (
                <UpButton onClick={handleClick}>
                    <FaArrowCircleUp />
                </UpButton>
            )}
        </>
    )
}