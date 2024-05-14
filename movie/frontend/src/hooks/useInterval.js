import { useEffect, useRef } from "react";

function useInterval(callback, interval) {
    const savedCallback = useRef(null);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback])

    useEffect(() => {
        function tick() {
            if (savedCallback.current) {
                savedCallback.current();
            }
        }

        if (interval !== null && interval !== 10000000) {
            let id = setInterval(tick, interval);
            return () => clearInterval(id);
        }
    }, [interval]);
}

export default useInterval;