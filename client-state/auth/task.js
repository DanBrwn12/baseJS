const signinForm = document.getElementById('signin__form')
const signinBtn = document.getElementById('signin__btn')
const signinDiv = document.getElementById('signin')
const welcomeDiv = document.getElementById('welcome')
const userIdSpan = document.getElementById('user_id')
const loginInput = document.getElementById('loginInput')
const passwordInput = document.getElementById('passwordInput')
const logoutBtn = document.getElementById('logout__btn')

function showWelcome(userId) {
  userIdSpan.textContent = userId
  signinDiv.classList.remove('signin_active')
  welcomeDiv.classList.add('welcome_active')
}

function showSigninForm() {
  signinForm.reset()
  signinDiv.classList.add('signin_active')
  welcomeDiv.classList.remove('welcome_active')
  localStorage.removeItem('userId')
}

const savedUserId = localStorage.getItem('userId')

if (savedUserId) {
  showWelcome(savedUserId)
}

signinForm.addEventListener('submit', (event) => {
  event.preventDefault()
  
  const formData = new FormData(signinForm)
  
  signinBtn.textContent = 'Загрузка...'
  signinBtn.disabled = true
  
  fetch('https://students.netoservices.ru/nestjs-backend/auth', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        signinForm.reset()
        localStorage.setItem('userId', data.user_id)
        showWelcome(data.user_id)
      } else {
        alert('Неверный логин/пароль')
        signinForm.reset()
      }
    })
    .catch(error => {
      console.error('Ошибка авторизации:', error)
      alert('Произошла ошибка при авторизации. Попробуйте позже.')
    })
    .finally(() => {
      signinBtn.textContent = 'Войти'
      signinBtn.disabled = false
    })
})

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    showSigninForm()
  })
}