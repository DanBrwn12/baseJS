const signinForm = document.getElementById('signin__form')
const signinBtn = document.getElementById('signin__btn')
const signinDiv = document.getElementById('signin')
const welcomeDiv = document.getElementById('welcome')
const userIdSpan = document.getElementById('user_id')

function showWelcome(userId) {
  userIdSpan.textContent = userId
  signinDiv.classList.remove('signin_active')
  welcomeDiv.classList.add('welcome_active')
}

const savedUserId = localStorage.getItem('userId')

if (savedUserId) {
  showWelcome(savedUserId)
}

signinForm.addEventListener('submit', (event) => {
  event.preventDefault()
  
  const formData = new FormData(signinForm)
  
  fetch('https://students.netoservices.ru/nestjs-backend/auth', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem('userId', data.user_id)
        showWelcome(data.user_id)
      } else {
        alert('Неверный логин/пароль')
      }
    })
    .catch(error => {
      console.error('Ошибка авторизации:', error)
      alert('Произошла ошибка при авторизации. Попробуйте позже.')
    })
})