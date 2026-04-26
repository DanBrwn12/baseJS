const editor = document.getElementById('editor')

const savedText = localStorage.getItem('editorContent')

if (savedText) {
  editor.value = savedText
}

editor.addEventListener('input', () => {
  localStorage.setItem('editorContent', editor.value)
})