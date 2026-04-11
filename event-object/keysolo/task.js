class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.timeElement = container.querySelector('.status__time');

    this.currentWord = '';
    this.timerId = null; 
    this.intervalId = null;

    this.reset();

    this.registerEvents();
  }

  reset() {
    this.clearTimers();
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  registerEvents() {
    document.addEventListener("keyup", (e) => {
      if (e.key.length === 1) {
        if (e.key.toLowerCase() === this.currentSymbol.textContent) {
          this.success()
        } else {
          this.fail()
        };
      };
    });
  }

  success() {
    if(this.currentSymbol.classList.contains("symbol_current")) this.currentSymbol.classList.remove("symbol_current");
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add('symbol_current');
      return;
    }

    const wins = ++this.winsElement.textContent;
    if (wins === 10) {
      alert('Победа!');
      this.reset();
      return;
    }
    this.setNewWord();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
  }

  setNewWord() {
    this.clearTimers();
    const word = this.getWord();
    this.currentWord = word;
    this.renderWord(word);
    this.startTimers();
  }

  getWord() {
    const words = [
        'bob',
        'awesome',
        'netology',
        'hello',
        'kitty',
        'rock',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'javascript'
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }


  startTimers() {
      const timeLimit = this.currentWord.length;

      let remainingTime = timeLimit;
      this.updateTimeDisplay(remainingTime);
      
      this.intervalId = setInterval(() => {
        remainingTime--;
        this.updateTimeDisplay(remainingTime);
        
        if (remainingTime <= 0) {
          this.clearTimers();
          this.fail();
        }
      }, 1000);

      this.timerId = setTimeout(() => {
        this.clearTimers();
        this.fail();
      }, timeLimit * 1000);
    }

    clearTimers() {
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }

    updateTimeDisplay(seconds) {
      if (this.timeElement) {
        this.timeElement.textContent = seconds;
      }
    }
}

new Game(document.getElementById('game'))

