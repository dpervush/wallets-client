import React from "react";

function debounce(fn, ms) {
  let timer;

  return (_) => {
    clearTimeout(timer);

    timer = setTimeout((_) => {
      timer = null;

      fn.apply(this, arguments);
    }, ms);
  };
}

export function useWindowSize() {
  const [size, setSize] = React.useState([0, 0]);

  React.useLayoutEffect(() => {
    const debouncedHandleResize = debounce(function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }, 100);

    window.addEventListener("resize", debouncedHandleResize);
    debouncedHandleResize();

    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);

  return size;
}
