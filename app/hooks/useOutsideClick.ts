import { useLayoutEffect, useState } from "react";

export const useOutSideClick = (element: HTMLElement) => {
  const [isOutsideClick, setIsOutsideClick] = useState<boolean>(false);

  const handleClick = (event: MouseEvent) => {
    if (element?.contains(event.target as HTMLElement)) {
      setIsOutsideClick(false);
    } else {
      setIsOutsideClick(true);
    }
  };

  useLayoutEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [element]);

  return { isOutsideClick };
};
