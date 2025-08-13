export function buildAuthAwareHref({
  authed,
  nextPath
}: { authed: boolean; nextPath: string }) {
  return authed ? nextPath : `/(auth)/login?next=${encodeURIComponent(nextPath)}`
}
