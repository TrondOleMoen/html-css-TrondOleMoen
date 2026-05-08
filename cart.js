if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  let removeCartItemButtons = document.getElementsByClassName(
    "remove-from-cart-btn",
  );
  for (let i = 0; i < removeCartItemButtons.length; i++) {
    let button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  let quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  let addToCartButtons = document.getElementsByClassName("shop-item-button");
  for (let i = 0; i < addToCartButtons.length; i++) {
    let button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }
}

function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  let button = event.target;
  let shopItem = button.parentElement.parentElement;
  // Replace with API tags
  let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  let price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  let imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  addItemToCart(title, price, imageSrc);
}

function addItemToCart(title, price, imageSrc) {
  let cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  let cartItems = document.getElementsByClassName("cart-items")[0];
  cartItems.append(cartRow);
  let cartRowContents = `
  <div class="cart-items">
    <!-- <div class="product-details-container"> -->
         <div class="cart-row">
            <!-- <div class="product-1">-->
                <div class="cart-details">
                    <img class="cart-item-image" src="${imageSrc}" 
                            alt="Sporty, slim and light rain jacket in vibrant red" />
                </div>
                <div class="product-details-text">
                    <h2>Helly Hansen Runner 3</h2>
                    <p>Sporty outdoors jacket excellent for a misty/rainy workout.</p>
                    <input class="cart-quantity-inupt" type="number" value="1">
                    <button class="remove-from-cart-btn">REMOVE</button>
                </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
}

function updateCartTotal() {
  let cartItemContainer = document.getElementsByClassName("cart-items")[0];
  let cartRows = cartItemContainer.getElementsByClassName("cart-row");
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName("cart-price")[0];
    let quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-inupt",
    )[0];
    // replace innerText with information from the API
    let price = parseFloat(priceElement.innerText.replace("$", ``));
    // replace value with price from the API
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round((total * 100) / 100);
  // change to work with API values
  document.getElementsByClassName("cart-total-price")[0].innerText =
    total + "kr";
}
