export function buildAuthAwareHref({
  authed,
  nextPath
}: { authed: boolean; nextPath: string }) {
  return authed ? nextPath : `/login?next=${encodeURIComponent(nextPath)}`
}
