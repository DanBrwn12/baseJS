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

function animateCartPulse() {
  cartContainer.classList.add('cart_pulse')
  setTimeout(() => {
    cartContainer.classList.remove('cart_pulse')
  }, 600)
}

function animateProductToCart(productImage, targetElement, callback) {
  const startRect = productImage.getBoundingClientRect()
  const targetRect = targetElement.getBoundingClientRect()
  
  const flyingImg = document.createElement('img')
  flyingImg.src = productImage.src
  flyingImg.className = 'flying-image'
  flyingImg.style.width = `${startRect.width}px`
  flyingImg.style.height = `${startRect.height}px`
  flyingImg.style.left = `${startRect.left}px`
  flyingImg.style.top = `${startRect.top}px`
  
  document.body.appendChild(flyingImg)
  
  const endLeft = targetRect.left + (targetRect.width / 2) - (startRect.width / 2)
  const endTop = targetRect.top + (targetRect.height / 2) - (startRect.height / 2)
  
  requestAnimationFrame(() => {
    flyingImg.style.left = `${endLeft}px`
    flyingImg.style.top = `${endTop}px`
    flyingImg.style.width = '40px'
    flyingImg.style.height = '40px'
    flyingImg.style.opacity = '0.8'
  })
  
  flyingImg.addEventListener('transitionend', () => {
    flyingImg.remove()
    if (callback) {
      callback()
    }
  }, { once: true })
  
  setTimeout(() => {
    if (flyingImg.parentNode) {
      flyingImg.remove()
      if (callback) {
        callback()
      }
    }
  }, 700)
}

function addToCartWithAnimation(productCard) {
  const productId = productCard.dataset.id
  const productImage = productCard.querySelector('.product__image')
  const quantityValue = parseInt(productCard.querySelector('.product__quantity-value').textContent)
  
  const cartTarget = document.querySelector('.cart__products')
  
  animateProductToCart(productImage, cartTarget, () => {
    addToCartLogic(productCard, productId, productImage.src, quantityValue)
    animateCartPulse()
  })
}

function addToCartLogic(productCard, productId, productImageSrc, quantityValue) {
  const existingCartItem = document.querySelector(`.cart__product[data-id="${productId}"]`)
  
  if (existingCartItem) {
    const countElement = existingCartItem.querySelector('.cart__product-count')
    const currentCount = parseInt(countElement.textContent)
    countElement.textContent = currentCount + quantityValue
    
    existingCartItem.style.transform = 'scale(1.1)'
    setTimeout(() => {
      existingCartItem.style.transform = 'scale(1)'
    }, 200)
  } else {
    const cartItem = document.createElement('div')
    cartItem.className = 'cart__product'
    cartItem.dataset.id = productId
    
    const img = document.createElement('img')
    img.className = 'cart__product-image'
    img.src = productImageSrc
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
    addButton.addEventListener('click', () => addToCartWithAnimation(product))
  }
})

updateCartVisibility()