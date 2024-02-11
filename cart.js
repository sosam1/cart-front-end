const URL = "http://127.0.0.1:4000/cart";

function toggleCartMenu() {
    var cartMenu = document.getElementById('cart-menu');
    cartMenu.classList.toggle('hidden'); // Alternar la clase 'hidden' para mostrar/ocultar el menú
    if (cartMenu.classList.contains('hidden')) {
      // Si la clase 'hidden' está presente, ocultar el menú desplazándolo hacia la derecha
      cartMenu.style.right = '-300px';
    } else {
      // Si la clase 'hidden' no está presente, mostrar el menú desplazándolo hacia la izquierda
      cartMenu.style.right = '0';
    }
  }

function getCartItems(){

    fetch(URL)
    .then(response => response.json())
    .then(cartItems => {

        console.log(cartItems)
        toggleCartMenu()

        let cartContainer = document.getElementById("cart-menu")
        cartContainer.innerHTML = ""; 

        cartItems.forEach(e => {
            
            cartContainer.innerHTML += `
            
            <div class="rounded lg:p-4 lg:mt-1 w-full bg-white flex flex-row">
                <div class="mr-auto">
                    <img class="w-28" src="${e.product_info[0].imagen}">
                </div>

                <div class="flex justify-between flex-grow">
                    <div class="flex flex-col">
                        <p class="mt-2 font-medium">${e.product_info[0].marca} ${e.product_info[0].modelo}</p>
                        <p class="mt-2">Stock available: ${e.product_info[0].stock}</p>
                        <div class="flex mt-4">
                            <select class="select-count-item w-12 text-center mr-4">
                                
                            </select>
                            <a onclick="deleteItemFromCart('${e._id}')"><img class="w-6" src="./img/eliminar.png"></a>
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


    })


}

function deleteItemFromCart(id){

    const DELETE_ITEM_URL = "http://127.0.0.1:4000/cart/"+id

    const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
    };

    fetch(DELETE_ITEM_URL, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudo eliminar el elemento del carrito');
      }
    
      console.log('Elemento del carrito eliminado con éxito');
      location.reload();
    })
    .catch(error => {
      console.error('Error al eliminar el elemento del carrito:', error);

    });
    

}
