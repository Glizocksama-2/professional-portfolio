// Shared scroll-progress store. One passive rAF-throttled listener feeds a
// plain mutable object; 3D frame loops read it directly every frame, so
// scroll-driven animation costs zero React re-renders.
export const scrollState = { progress: 0 };

let started = false;

export function ensureScrollTracking() {
  if (started || typeof window === 'undefined') return;
  started = true;
  let ticking = false;
  const update = () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollState.progress = docHeight > 0 ? window.scrollY / docHeight : 0;
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
  update();
}
