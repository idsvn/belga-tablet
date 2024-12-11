import { useEffect, useRef } from 'react';

const useDidMountEffect = (func: () => void, deps: any[]): void => {
  const didMount = useRef<boolean>(false);

  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, deps);
};

export default useDidMountEffect;
