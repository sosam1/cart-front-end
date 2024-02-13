const URL_CART_ITEMS = "http://127.0.0.1:4000/cart";
let subtotal = 0 //global variable for calculate the subtotal when the user change the count item with the select option

// Función para mostrar y ocultar el menú del carrito
function toggleCartMenu() {
    let cartMenu = document.getElementById('cart-menu');
    cartMenu.classList.toggle('hidden');
    
    let menuWidth = cartMenu.offsetWidth;
    
    if (cartMenu.classList.contains('hidden')) {
        cartMenu.style.right = '-700px';
    } else {
        cartMenu.style.right = '0';
    }
}

function getCartItems(){

    fetch(URL_CART_ITEMS)
    .then(response => response.json())
    .then(cartItems => {

        toggleCartMenu()

        if(cartItems.length > 0){

          let cartContainer = document.getElementById("cart-menu")
          cartContainer.innerHTML = "";
          subtotal = 0

          cartItems.forEach(e => {
              subtotal += e.product_info[0].precio
              cartContainer.innerHTML += `
              
              <div class="cart-item-container rounded lg:p-4 lg:mt-1 w-full bg-white flex flex-row">
                  <div class="mr-auto">
                      <img class="img-item sm:w-20 lg:w-28" src="${e.product_info[0].imagen}">
                  </div>
                  <div class="flex justify-between flex-grow">
                      <div class="flex flex-col">
                          <p class="mt-2 font-medium">${e.product_info[0].marca} ${e.product_info[0].modelo}</p>
                          <p class="mt-2">Stock available: ${e.product_info[0].stock}</p>
                          <div class="flex mt-4">
                              <select onchange="selectChangeHandler(event, '${e.product_info[0].precio}')" data-price='${e.product_info[0].precio}' class="select-count-item w-12 text-center mr-4">
                                  
                              </select>
                              <a onclick="deleteItemFromCart('${e._id}', '${e.id}')"><img class="img-trash sm:w-6 lg:w-6" src="./img/eliminar.png"></a>
                          </div>
                      </div>
                      <p class="ml-auto font-medium">USD${e.product_info[0].precio}</p>
                  </div>
              </div>
              
              `       
              let selectCountItems = document.querySelectorAll(".select-count-item");
              let selectCountItem = selectCountItems[selectCountItems.length - 1];

              for(let x = 1; x <= e.product_info[0].stock; x++){
                  selectCountItem.innerHTML += `<option>${x}</option>`;
              }
          });
          cartContainer.innerHTML += `
          
          <div class="subtotal-container rounded lg:p-4 lg:mt-10 w-full bg-white flex flex-row justify-end">
                <p id="subtotal" class="font-bold">Subtotal: USD ${subtotal}</p>
          </div>
          
          `
        } else { //if the cart is empty show a message 
          let cartContainer = document.getElementById("cart-menu")

          cartContainer.innerHTML = `
          
          <p class="flex justify-center font-semibold text-4xl">There is a cart to fill!</p>
          <p class="flex justify-center text-xl">You currently have no products in your cart.</p>
          
          `
        }
    })
}

function selectChangeHandler(event, price) {
    let txtSubtotal = document.getElementById("subtotal")
    let selectedQuantity = parseInt(event.target.value);
    let totalPrice = price * selectedQuantity;

    //Update the product price in the cart
    event.target.parentElement.parentElement.nextElementSibling.textContent = `USD${totalPrice.toFixed(2)}`;

    //Update the subtotal adding up each product price in the cart
    let selectCountItems = document.querySelectorAll(".select-count-item");
    let newSubtotal = 0;
    selectCountItems.forEach(select => {
        let selectedQuantity = parseInt(select.value);
        let price = parseFloat(select.getAttribute('data-price').trim());
        newSubtotal += selectedQuantity * price;
    });
    subtotal = newSubtotal;
    txtSubtotal.innerHTML = "USD " + subtotal
}

function deleteItemFromCart(id, id_product){
    const DELETE_ITEM_URL = "http://127.0.0.1:4000/cart/"+id+"?id_product="+id_product //"?id_product="+id_product neccesary for adding up the stock of the product

    const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
    };

    fetch(DELETE_ITEM_URL, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Could not remove item from cart');
      }
      location.reload();
    })
    .catch(error => {
      console.error('Error removing item from cart:', error);
    });
    
}
