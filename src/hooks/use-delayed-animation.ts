import { useState, useEffect } from "react";

export const useDelayedAnimation = (delay: number = 200) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!animate) return;

    const timer = setTimeout(() => {
      setAnimate(false);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [animate, delay]);

  const triggerAnimation = () => {
    setAnimate(true);
  };

  return [animate, triggerAnimation] as const;
};
