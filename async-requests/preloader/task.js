const itemsContainer = document.getElementById('items')
const loader = document.getElementById('loader')

const CACHE_KEY = 'currencyRates'
const CACHE_TIMESTAMP_KEY = 'currencyRatesTimestamp'
const CACHE_DURATION = 1 * 60 * 1000

function displayCurrencies(valuteData) {
  itemsContainer.innerHTML = ''
  
  for (const currency in valuteData) {
    const currencyData = valuteData[currency]
    
    const itemDiv = document.createElement('div')
    itemDiv.classList.add('item')

    const codeDiv = document.createElement('div')
    codeDiv.classList.add('item__code')
    codeDiv.textContent = currencyData.CharCode
    
    const valueDiv = document.createElement('div')
    valueDiv.classList.add('item__value')
    valueDiv.textContent = currencyData.Value
    
    const currencyDiv = document.createElement('div')
    currencyDiv.classList.add('item__currency')
    currencyDiv.textContent = 'руб.'
    
    itemDiv.appendChild(codeDiv)
    itemDiv.appendChild(valueDiv)
    itemDiv.appendChild(currencyDiv)
    
    itemsContainer.appendChild(itemDiv)
  }
}

function loadFromCache() {
  const cachedData = localStorage.getItem(CACHE_KEY)
  const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY)
  
  if (cachedData && cachedTimestamp) {
    const now = Date.now()
    const isCacheValid = (now - parseInt(cachedTimestamp)) < CACHE_DURATION
    
    if (isCacheValid) {
      const valute = JSON.parse(cachedData)
      displayCurrencies(valute)
      loader.classList.remove('loader_active')
      return true
    }
  }
  return false
}

function saveToCache(valuteData) {
  localStorage.setItem(CACHE_KEY, JSON.stringify(valuteData))
  localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString())
}

function loadFromServer() {
  fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses')
    .then(response => response.json())
    .then(data => {
      const valute = data.response.Valute
      
      saveToCache(valute)
      
      displayCurrencies(valute)
      
      loader.classList.remove('loader_active')
    })
    .catch(error => {
      console.error('Ошибка загрузки курсов валют:', error)
      
      const cachedData = localStorage.getItem(CACHE_KEY)
      if (cachedData) {
        console.log('Используем кэшированные данные из-за ошибки сети')
        const valute = JSON.parse(cachedData)
        displayCurrencies(valute)
        loader.classList.remove('loader_active')
        itemsContainer.insertAdjacentHTML('beforebegin', '<div style="color: orange; padding: 10px; text-align: center;">Используются кэшированные данные. Обновление не удалось.</div>')
      } else {
        loader.classList.remove('loader_active')
        itemsContainer.innerHTML = '<p>Ошибка загрузки данных. Попробуйте позже.</p>'
      }
    })
}

const hasValidCache = loadFromCache()

if (!hasValidCache) {
  loadFromServer()
} else {
  loadFromServer()
}