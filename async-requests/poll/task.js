const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');

function loadPoll() {
  fetch('https://students.netoservices.ru/nestjs-backend/poll')
    .then(response => response.json())
    .then(data => {
      pollTitle.textContent = data.data.title;
      
      pollAnswers.innerHTML = '';
      
      const answers = data.data.answers;
      answers.forEach(answer => {
        const button = document.createElement('button');
        button.classList.add('poll__answer');
        button.textContent = answer;
        
        button.addEventListener('click', () => {
          alert('Спасибо, ваш голос засчитан!');
        });
        
        pollAnswers.appendChild(button);
      });
    })
    .catch(error => {
      console.error('Ошибка загрузки опроса:', error);
      pollTitle.textContent = 'Не удалось загрузить опрос. Попробуйте позже.';
      pollAnswers.innerHTML = '<button class="poll__answer" onclick="location.reload()">Перезагрузить страницу</button>';
    });
}

loadPoll();