export const isTouchDevice = (): boolean => {
  if ("ontouchstart" in window || navigator.maxTouchPoints) {
    return true;
  }
  return window.matchMedia("(pointer: coarse)").matches;
}
