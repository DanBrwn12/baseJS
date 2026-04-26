const form = document.getElementById('form')
const fileInput = document.getElementById('file')
const progress = document.getElementById('progress')

form.addEventListener('submit', (event) => {
  event.preventDefault()
  
  if (!fileInput.files.length) {
    alert('Пожалуйста, выберите файл для загрузки')
    return
  }
  
  const formData = new FormData(form)
  
  const xhr = new XMLHttpRequest()
  
  xhr.upload.addEventListener('progress', (event) => {
    if (event.lengthComputable) {
      const percentComplete = (event.loaded / event.total) * 100
      progress.value = percentComplete / 100
    }
  })
  
  xhr.addEventListener('load', () => {
    if (xhr.status === 201 || xhr.status === 200) {
      alert('Файл успешно загружен!')
      progress.value = 0
      fileInput.value = ''
      const fileDesc = document.querySelector('.input__wrapper-desc')
      fileDesc.textContent = 'Имя файла...'
    } else {
      alert('Ошибка при загрузке файла. Попробуйте позже.')
    }
  })
  
  xhr.addEventListener('error', () => {
    alert('Произошла сетевая ошибка. Проверьте соединение с интернетом.')
  })
  
  xhr.open('POST', form.action)
  xhr.send(formData)
})