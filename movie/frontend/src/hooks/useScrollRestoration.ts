import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function useScrollRestoration() {
  const scrollableDivRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const saveScrollPos = (url: string) => {
    const scrollableDiv = scrollableDivRef.current;
    if (scrollableDiv) {
      const scrollPos = {
        x: scrollableDiv.scrollLeft,
        y: scrollableDiv.scrollTop,
      };
      sessionStorage.setItem(url, JSON.stringify(scrollPos));
    }
  };

  const restoreScrollPos = (url: string) => {
    const scrollableDiv = scrollableDivRef.current;
    if (scrollableDiv) {
      const scrollPos = JSON.parse(sessionStorage.getItem(url) || "{}");
      if (scrollPos) {
        requestAnimationFrame(() => {
          scrollableDiv.scrollLeft = scrollPos.x ?? 0;
          scrollableDiv.scrollTop = scrollPos.y ?? 0;
        });
      }
    }
  };

  useEffect(() => {
    saveScrollPos(location.pathname);
    restoreScrollPos(location.pathname);
  }, [location]);

  return scrollableDivRef;
}

export default useScrollRestoration;
