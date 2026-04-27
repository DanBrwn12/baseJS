const productControl = document.querySelectorAll(".product__quantity-control")
const productsAdd = document.querySelectorAll(".product__add")
const cartProducts = document.querySelector(".cart__products")


productControl.forEach(controlElement => {
        controlElement.addEventListener("click", () => {
            const quantityBlock = controlElement.closest(".product__quantity")    
            const quantityElement = quantityBlock.querySelector(".product__quantity-value")
    
            if (controlElement.classList.contains("product__quantity-control_inc")) {
                let currentValue = Number(quantityElement.textContent)
                quantityElement.textContent = currentValue + 1
            } else if (controlElement.classList.contains("product__quantity-control_dec")) {
                let currentValue = Number(quantityElement.textContent)
                if (currentValue > 1) {
                    quantityElement.textContent = currentValue - 1
                }
                
            }
    

    })
    
});

productsAdd.forEach(productAdd => {
    productAdd.addEventListener("click", () => {
        const product = productAdd.closest(".product")
        const ProductQuantityValue = product.querySelector(".product__quantity-value")
        const productImg = product.querySelector("img")
        const productCount = product.querySelector(".product__quantity-value")

        const cartProduct = document.querySelectorAll(".cart__product")


        if (cartProduct.length === 0) {
            
        const productInCart = document.createElement("div")
        productInCart.className = "cart__product"
        productInCart.dataset.id = product.dataset.id
                
        const productInCartImg = document.createElement("img")
        productInCartImg.className = "cart__product-image"
        productInCartImg.src = productImg.src

        const productInCartCount = document.createElement("div")
        productInCartCount.className = "cart__product-count"
        productInCartCount.textContent = productCount.textContent

        cartProducts.appendChild(productInCart)

        productInCart.appendChild(productInCartImg)
        productInCart.appendChild(productInCartCount)
        } else {
            cartProduct.forEach(element => {
                if (element.dataset.id.includes(product.dataset.id)) { НИХУЯ НЕ ИНКЛУДЕС БЛЯТЬ
                    const productInCartCount = cartProducts.querySelector(".cart__product-count")
                    const currentCount = Number(productInCartCount.textContent) + Number(productCount.textContent)
                    productInCartCount.textContent = currentCount                
                }  else {
                    const productInCart = document.createElement("div")
                    productInCart.className = "cart__product"
                    productInCart.dataset.id = product.dataset.id
                
                    const productInCartImg = document.createElement("img")
                    productInCartImg.className = "cart__product-image"
                    productInCartImg.src = productImg.src

                    const productInCartCount = document.createElement("div")
                    productInCartCount.className = "cart__product-count"
                    productInCartCount.textContent = productCount.textContent

                    cartProducts.appendChild(productInCart)

                    productInCart.appendChild(productInCartImg)
                    productInCart.appendChild(productInCartCount)
                }

            })
        }



    });
        

})
