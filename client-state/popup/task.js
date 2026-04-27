const modal = document.getElementById('subscribe-modal')
const closeButton = document.querySelector('.modal__close')

function getCookie(name) {
  const cookies = document.cookie.split('; ')
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=')
    if (cookieName === name) {
      return decodeURIComponent(cookieValue)
    }
  }
  return null
}

function setCookie(name, value, days) {
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/'
}

const isModalClosed = getCookie('modalClosed')

if (!isModalClosed) {
  modal.classList.add('modal_active')
}

closeButton.addEventListener('click', () => {
  modal.classList.remove('modal_active')
  setCookie('modalClosed', 'true', 365)
})