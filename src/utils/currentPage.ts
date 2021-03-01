export function currentPage(): string {
  return decodeURI(window.location.pathname.replace('/', ''))
}