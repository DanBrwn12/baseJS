const cartProductsContainer = document.querySelector('.cart__products')
const products = document.querySelectorAll('.product')

function updateQuantity(productCard, delta) {
  const quantityValue = productCard.querySelector('.product__quantity-value')
  let currentValue = parseInt(quantityValue.textContent)
  let newValue = currentValue + delta
  
  if (newValue >= 1) {
    quantityValue.textContent = newValue
  }
}

function addToCart(productCard) {
  const productId = productCard.dataset.id
  const productImage = productCard.querySelector('.product__image').src
  const quantityValue = parseInt(productCard.querySelector('.product__quantity-value').textContent)
  
  const existingCartItem = document.querySelector(`.cart__product[data-id="${productId}"]`)
  
  if (existingCartItem) {
    const countElement = existingCartItem.querySelector('.cart__product-count')
    const currentCount = parseInt(countElement.textContent)
    countElement.textContent = currentCount + quantityValue
  } else {
    const cartItem = document.createElement('div')
    cartItem.className = 'cart__product'
    cartItem.dataset.id = productId
    
    const img = document.createElement('img')
    img.className = 'cart__product-image'
    img.src = productImage
    
    const count = document.createElement('div')
    count.className = 'cart__product-count'
    count.textContent = quantityValue
    
    cartItem.appendChild(img)
    cartItem.appendChild(count)
    cartProductsContainer.appendChild(cartItem)
  }
}

products.forEach(product => {
  const decButton = product.querySelector('.product__quantity-control_dec')
  const incButton = product.querySelector('.product__quantity-control_inc')
  const addButton = product.querySelector('.product__add')
  
  if (decButton) {
    decButton.addEventListener('click', () => updateQuantity(product, -1))
  }
  
  if (incButton) {
    incButton.addEventListener('click', () => updateQuantity(product, 1))
  }
  
  if (addButton) {
    addButton.addEventListener('click', () => addToCart(product))
  }
})