import { useState, useEffect, useRef, RefObject } from "react";

type UseObserverOptions = {
  callback: IntersectionObserverCallback;
  options?: IntersectionObserverInit;
  movieListLength: number;
};

type UseObserverResult = {
  containerRef: RefObject<HTMLDivElement>;
  loading: boolean;
  page: number;
  hasMore: boolean;
};

const useIntersectionObserver = ({
  callback,
  options,
  movieListLength,
}: UseObserverOptions): UseObserverResult => {
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const handleIntersect: IntersectionObserverCallback = (
      entries,
      observer
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !loading) {
          setLoading(true);
          setTimeout(() => {
            setPage((prevPage) => prevPage + 1);
            setLoading(false);
          }, 1000);
        }
      });

      callback(entries, observer);
    };

    if (containerRef.current) {
      observerRef.current = new IntersectionObserver(handleIntersect, options);
      observerRef.current.observe(containerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [callback, options, loading, hasMore]);

  useEffect(() => {
    if (movieListLength < 20) {
      setHasMore(false);
    }
  })

  return { containerRef, loading, page, hasMore };
};

export default useIntersectionObserver;
