import { Suspense, lazy, useCallback } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

/**
 * Called once the Spline runtime finishes loading.
 * Finds every non-canvas sibling (the "Built with Spline" watermark div)
 * and hides it, then sets up a MutationObserver in case it gets re-injected.
 */
function useHideWatermark() {
  return useCallback((splineApp) => {
    const canvas = splineApp?.canvas;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const hideExtras = () => {
      Array.from(parent.children).forEach((child) => {
        if (child.tagName !== 'CANVAS') {
          child.style.setProperty('display', 'none', 'important');
          child.style.setProperty('pointer-events', 'none', 'important');
        }
      });
    };

    hideExtras();

    // Watch for late-injected watermark elements
    const observer = new MutationObserver(hideExtras);
    observer.observe(parent, { childList: true, subtree: false });
  }, []);
}

const LoadingFallback = () => (
  <div className="w-full h-full flex flex-col items-center justify-center gap-3">
    <svg
      className="animate-spin h-8 w-8"
      style={{ color: '#F5921E' }}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"
      />
    </svg>
    <span className="font-mono text-xs uppercase tracking-wider" style={{ color: '#00B8A0' }}>
      Loading…
    </span>
  </div>
);

export function InteractiveRobotSpline({ scene, className }) {
  const onLoad = useHideWatermark();

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Spline scene={scene} className={className} onLoad={onLoad} />
    </Suspense>
  );
}

export default InteractiveRobotSpline;
