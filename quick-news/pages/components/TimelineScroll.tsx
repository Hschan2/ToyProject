import React, { useEffect, useState } from 'react'
import { TimelineScrollBar, TimelineScrollContainer } from '../constants/styledComponents';

export default function TimelineScroll() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
      const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const progress = (scrollTop / scrollHeight) * 100;
        setScrollProgress(progress);
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    return (
        <TimelineScrollContainer>
            <TimelineScrollBar progress={scrollProgress} />
        </TimelineScrollContainer>
    )
}