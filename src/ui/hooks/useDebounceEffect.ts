import {useEffect, useRef} from 'react';

function useDebouncedEffect(callback: () => void, delay: number, deps: any[]) {
  const cleanupRef = useRef<() => void>();

  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, deps);

  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  cleanupRef.current = callback;
}

export default useDebouncedEffect;
