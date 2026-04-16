/**
 * Minimal cn() utility — joins class names, filtering falsy values.
 * Drop-in for clsx/tailwind-merge when those aren't installed.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
