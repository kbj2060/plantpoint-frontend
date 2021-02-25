export default function getCurrentPage() {
  return decodeURI(window.location.pathname.replace('/', ''))
}