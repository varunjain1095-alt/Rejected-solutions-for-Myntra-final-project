/** Wait until a selector exists in the DOM (for Joyride step prep). */
export function waitForSelector(selector, timeout = 4000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const tick = () => {
      if (document.querySelector(selector)) {
        resolve();
        return;
      }
      if (Date.now() - start > timeout) {
        reject(new Error(`Tour target not found: ${selector}`));
        return;
      }
      requestAnimationFrame(tick);
    };
    tick();
  });
}

export function nextFrame() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });
}
