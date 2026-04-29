const cartContainer = document.getElementById('cart')
const cartProductsContainer = document.getElementById('cart__products')
const cartEmptyMessage = document.getElementById('cartEmptyMessage')
const products = document.querySelectorAll('.product')

function updateCartVisibility() {
  const cartItems = document.querySelectorAll('.cart__product')
  const hasItems = cartItems.length > 0
  
  if (hasItems) {
    cartContainer.classList.add('cart_active')
    cartEmptyMessage.classList.add('cart__empty-message_hide')
  } else {
    cartContainer.classList.remove('cart_active')
    cartEmptyMessage.classList.remove('cart__empty-message_hide')
  }
}

function updateQuantity(productCard, delta) {
  const quantityValue = productCard.querySelector('.product__quantity-value')
  let currentValue = parseInt(quantityValue.textContent)
  let newValue = currentValue + delta
  
  if (newValue >= 1) {
    quantityValue.textContent = newValue
  }
}

function deleteCartItem(cartItem) {
  cartItem.remove()
  updateCartVisibility()
}

function createDeleteButton() {
  const deleteBtn = document.createElement('button')
  deleteBtn.className = 'cart__product-delete'
  deleteBtn.textContent = '×'
  deleteBtn.title = 'Удалить товар'
  return deleteBtn
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
    img.alt = 'Товар'
    
    const count = document.createElement('div')
    count.className = 'cart__product-count'
    count.textContent = quantityValue
    
    const deleteBtn = createDeleteButton()
    deleteBtn.addEventListener('click', (event) => {
      event.stopPropagation()
      deleteCartItem(cartItem)
    })
    
    cartItem.appendChild(img)
    cartItem.appendChild(count)
    cartItem.appendChild(deleteBtn)
    cartProductsContainer.appendChild(cartItem)
  }
  
  updateCartVisibility()
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

updateCartVisibility()