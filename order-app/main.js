import menuArray from "./data";
let cartItems = []


document.addEventListener("click", (e) => {
    const addIcon = e.target.dataset.add
    if (addIcon){
        addToCart(addIcon)
    }
})

function addToCart(itemId){
    // find the target item and push it into the cart array
    const targetItem = menuArray.filter((item) => item.id === itemId)[0]
    cartItems.push(targetItem)
    renderCartItems()
}

function totalItemsToCheckout(){
    cartItems.reduce((total, item) => total + item)
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
                    <p class="item-ingredients">${item.ingredients}</p>
                    <h2 class="item-price">${item.price}</h2>
                    </span>
                </div>
                <span class="icon">
                    <i class="fa-solid fa-plus data-add=${item.id}" style="color: #3C3C3C"></i>
                </span>
            </section>
        </div>
        `;
    });
    return menuHtlm
}

getMenuHtml()

// display the shopping cart and calculate the total
function getCartItemsHtml(){
    cartItems.map((item) => {
    return `
        <div class="item-cart">
            <h2>Your order</h2>
            <div class="item-list">
                <h2>${item.name}</h2>
                <button class="btn-remove" data-remove=${item.id}>remove</button>
                <span>${item.price}</span>
            </div>

            <div>
                <h2>Total price:</h2>
                <span>TOT-PRICE</span>
            </div>
        </div>
    `
    })
}

// render cart items when an item is added to cart
function renderCartItems(){
    const cartEl = document.getElementById("cart")
    cartEl.innerHTML = getCartItemsHtml()
}


function render(){
    const mainEl = document.getElementById("main")
    mainEl.innerHTML = getMenuHtml()
}

render()
