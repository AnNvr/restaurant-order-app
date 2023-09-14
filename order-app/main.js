import menuArray from "./data";
let cartItems = []
const modal = document.getElementById("modal")
const form = document.getElementById("form")
const orderCompleteContainer = document.querySelector(".order-complete-container")
const orderCompleteText = document.getElementById("order-complete-text");
const totalContainer = document.querySelector(".total-container");

document.addEventListener("click", (e) => {
    const addIcon = e.target.dataset.add
    const removeItem = e.target.dataset.remove
    const completeOrderBtn = e.target.dataset.role

    if (addIcon){
        addToCart(addIcon)
    } else if (removeItem){
        handleDeleteClick(removeItem)
    } else if (completeOrderBtn){
        renderModal()
    } else if (e.target.id === "modal-close-btn"){
        modal.style.display = "none"
    } else if (e.target.dataset.role === "pay-btn"){
        pay()
    }
})

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
                    <h2 class="item-price">$${item.price}</h2>
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



// display the shopping list
function getCartItemsHtml(){
    let cartHtml = ""
    cartItems.map((item) => {
        cartHtml += `
            <div class="cart-item">
                <h2 class="cart-item-name">${item.name}</h2>
                <button class="btn-remove" data-remove=${item.id}>remove</button>
                <p class="cart-item-price">$${item.price}</p>
            </div>
        `
        }).join("")
        
        return cartHtml
}

// add to cart mechanics
function addToCart(itemId){
    cartItems.push(menuArray[itemId])
    document.getElementById('cart-el').classList.add('show')
    renderCart()
}

// remove item
function handleDeleteClick(itemId){
    const itemIndex = cartItems.findIndex(item => item.id === itemId)
    cartItems.splice(itemIndex, 1)

    if (cartItems.length === 0){
        document.getElementById("cart-el").classList.remove("show")
    }
    renderCart()
}

// elaborate total
function getTotalPrice(){
    // return cartItems.reduce((total, item) => total + item.price, 0)

    const total = cartItems.reduce((totalPrice, item) => {
        const itemPrice = item.price;
        const itemID = item.id;
        // Check if specific item IDs are in the cart together
        const areIdsInCart = cartItems.some(cartItem =>
            cartItem.id !== itemID &&
            (itemID === 0 && cartItem.id === 2) || (itemID === 2 && cartItem.id === 0) ||
            (itemID === 1 && cartItem.id === 2) || (itemID === 2 && cartItem.id === 1)
        );

        if (areIdsInCart) {
            const discount = (20 / 100) * itemPrice; // 20% discount (you can adjust this)
            totalPrice += itemPrice - discount;
        } else {
            totalPrice += itemPrice;
        }

        return totalPrice;
    }, 0);

    return total;
}

// render cart checkout with total
function renderCart(){
    const total = getTotalPrice();
    const cartItemsHtml = getCartItemsHtml();
    document.getElementById("cart-items").innerHTML = cartItemsHtml;
    document.getElementById("tot-price").textContent = `$${total}`;

    // discount perk
    
    
    // Check if there are items in the cart and show/hide the total container accordingly
    if (cartItems.length > 0) {
        totalContainer.style.display = "block";
        orderCompleteContainer.style.display = "none"
    } else {
        totalContainer.style.display = "none";
    }
}

// render modal
function renderModal(){
    document.getElementById('cart-el').classList.remove('show')
    modal.style.display = "block"

}

// form management
form.addEventListener("submit", (e) => {
    e.preventDefault()

    const formData = new FormData(form)
    const fullName = formData.get("fullName")

    // Update the order confirmation text with the entered name
    orderCompleteContainer.style.display = "flex"
    orderCompleteText.textContent = `Thanks, ${fullName}! Your order is on its way!`;

    // Close the modal
    modal.style.display = "none";

    // Clear up the array from items to start a new order
    cartItems.length = 0
    renderCart()
})

// pay
function pay() {
    form.submit()
}

function renderMenu(){
    document.getElementById("menu-el").innerHTML = getMenuHtml()
}

renderMenu()
