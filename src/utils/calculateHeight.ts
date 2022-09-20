import { RefObject } from 'react';

interface calculateHeightParams {
  (ref: RefObject<HTMLElement>, baseHeight?: number, reset?: boolean): void;
}

export const calculateHeight: calculateHeightParams = (
  ref,
  baseHeight = 41,
  reset,
) => {
  if (ref.current) {
    ref.current.style.height = `${baseHeight}px`;
    if (!reset) {
      const scrollHeight = ref.current.scrollHeight;
      ref.current.style.height = `${scrollHeight}px`;
    }
  }
};
