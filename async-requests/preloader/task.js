const itemsContainer = document.getElementById('items')
const loader = document.getElementById('loader')

fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses')
  .then(response => response.json())
  .then(data => {
    loader.classList.remove('loader_active')

    const valute = data.response.Valute
    
    for (const currency in valute) {
      const currencyData = valute[currency]
      
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
  })
  .catch(error => {
    console.error('Ошибка загрузки курсов валют:', error)
    loader.classList.remove('loader_active')
    itemsContainer.innerHTML = '<p>Ошибка загрузки данных. Попробуйте позже.</p>';
  })