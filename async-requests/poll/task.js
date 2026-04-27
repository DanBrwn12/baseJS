const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');

let currentPollId = null;

function displayResults(statData) {
  pollAnswers.innerHTML = '';
  
  let totalVotes = 0;
  statData.forEach(item => {
    totalVotes += item.votes;
  });
  
  statData.forEach(item => {
    const percentage = totalVotes > 0 ? ((item.votes / totalVotes) * 100).toFixed(1) : 0;
    
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('poll__result');
    
    const answerText = document.createElement('div');
    answerText.classList.add('poll__result-answer');
    answerText.textContent = item.answer;
    
    const votesInfo = document.createElement('div');
    votesInfo.classList.add('poll__result-votes');
    votesInfo.textContent = `${item.votes} голосов (${percentage}%)`;
    
    const progressBar = document.createElement('div');
    progressBar.classList.add('poll__progress-bar');
    
    const progressFill = document.createElement('div');
    progressFill.classList.add('poll__progress-fill');
    progressFill.style.width = `${percentage}%`;
    progressFill.textContent = percentage > 10 ? `${percentage}%` : '';
    
    progressBar.appendChild(progressFill);
    
    resultDiv.appendChild(answerText);
    resultDiv.appendChild(votesInfo);
    resultDiv.appendChild(progressBar);
    
    pollAnswers.appendChild(resultDiv);
  });
}

function sendVote(pollId, answerIndex) {
  const formData = new URLSearchParams();
  formData.append('vote', pollId);
  formData.append('answer', answerIndex);
  
  fetch('https://students.netoservices.ru/nestjs-backend/poll', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString()
  })
    .then(response => response.json())
    .then(data => {
      displayResults(data.stat);
    })
    .catch(error => {
      console.error('Ошибка при отправке голоса:', error);
      alert('Произошла ошибка при голосовании. Попробуйте позже.');
    });
}

function loadPoll() {
  pollAnswers.innerHTML = '<div class="loader" style="display: block; text-align: center;">Загрузка...</div>';
  
  fetch('https://students.netoservices.ru/nestjs-backend/poll')
    .then(response => response.json())
    .then(data => {
      currentPollId = data.id;
      pollTitle.textContent = data.data.title;
      
      pollAnswers.innerHTML = '';
      
      const answers = data.data.answers;
      answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.classList.add('poll__answer');
        button.textContent = answer;
        
        button.addEventListener('click', () => {
          sendVote(currentPollId, index);
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