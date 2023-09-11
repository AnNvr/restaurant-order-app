import menuArray from "./data";
let cartItems = []


document.addEventListener("click", (e) => {
    const addIcon = e.target.dataset.add
    if (addIcon){
        addToCart(addIcon)
    }
})

function getTotalPrice(){
    return cartItems.reduce((total, item) => total + item.price, 0)
}

function addToCart(itemId){
    // convert the itemId to a number
    const targetItemId = Number(itemId)
    // find the target item and push it into the cart array
    const targetItemObj = menuArray.find((item) => item.id === targetItemId)
    if (targetItemObj){
        cartItems.push(targetItemObj)
        renderCartItems()
    }
}


function getMenuHtml() {
    let menuHtlm = "";
    menuArray.map((item) => {
        menuHtlm += `
        <div class="item">
            <section class="item-container">
                <div class="item-details">
                    <img src="${item.picture}" class="item-pic">
                    <span class="item-description">
                    <h2 class="item-name">${item.name}</h2>
                    <p class="item-ingredients">${item.ingredients.join(", ")}</p>
                    <h2 class="item-price">${item.price}</h2>
                    </span>
                </div>
                <span class="icon">
                    <i class="fa-solid fa-plus" data-add=${item.id} style="color: #3C3C3C"></i>
                </span>
            </section>
        </div>
        `;
    })
    return menuHtlm
}

getMenuHtml()



// display the shopping cart and calculate the total
function getCartItemsHtml(){
    const total = getTotalPrice()
    return cartItems.map((item) => {
        return `
            <h2 class="cart-title">Your order</h2>
            <div class="cart-items" id="cart-items">

            <div class="cart-item">
                <h2 class="cart-item-name">${item.name}</h2>
                <button class="btn-remove" data-remove=${item.id}>remove</button>
                <p class="cart-item-price">$${item.price}</p>
            </div>

            </div>

            <div class="total-container">
            <h2 class="cart-item-name">Total price:</h3>
            <p class="cart-tot-price" id="tot-price">$${total}</p>
            </div>
            <button class="btn-complete">
            Complete order
            </button>
        `
        }).join("")
}

// render cart items when an item is added to cart
function renderCartItems(){
    document.getElementById("cart").innerHTML = getCartItemsHtml()
}


function renderMenu(){
    document.getElementById("menu").innerHTML = getMenuHtml()
}

renderMenu()
