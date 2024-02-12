//post type request that inserts an item in the carts collection
function addToCart(id, stock) { 
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "id": id,
        "stock": stock
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:4000/cart", requestOptions)
        .then(response => response.text())
        .then(result => {
            //message for the user about the result
            let alertContainer = document.getElementById("alert-container")
            let alertMessage = document.getElementById("alert-message")

            alertMessage.innerHTML = result
            
            alertContainer.classList.remove("hidden");
            setTimeout(function() {
                alertContainer.classList.add("hidden");
            }, 2000);
        
            // Add color class based on the message type
            if (result.includes("successfully")) {
                alertContainer.classList.add("bg-teal-100"); // Teal for success
                alertContainer.classList.add("border-teal-500");
            } else if (result.includes("product is already")) {
                alertContainer.classList.add("bg-yellow-100"); // Yellow for warning
                alertContainer.classList.add("border-yellow-500");
            } else {
                alertContainer.classList.add("bg-red-100"); // Red for error
                alertContainer.classList.add("border-red-500");
            }
        })
        .catch(error => console.log('error', error));
}

document.addEventListener("DOMContentLoaded", function() {
  
const URL = "http://127.0.0.1:4000/products";

container = document.getElementById("items-container");

fetch(URL)
    .then(response => response.json())
    .then(data => {
        //show the first 4 items
        for(let i=0; i<=4; i++){
            
            container.innerHTML += `
            
            <div id="item${i}" class="btn hover:transform hover:-translate-y-5 transition duration-300 product-container flex flex-col bg-white rounded-lg overflow-hidden shadow-lg sm:mx-2 lg:mx-auto">
                <img class="w-full h-64 object-cover" src="${data[i].imagen}" alt="Producto">
                <div class="p-6">
                    <h2 class="sm:text-sm lg:text-xl font-semibold text-gray-800 mb-2">${data[i].modelo}</h2>
                    <p class="text-gray-600">${data[i].marca}</p>
                    <p class="text-gray-600 mb-4">${data[i].stock} available</p>
                    <div class="flex items-center justify-between">
                        <span class="sm:text-2xl lg:text-2xl text-gray-900 font-semibold">USD ${data[i].precio}</span>
                        <button onclick="addToCart('${data[i]._id}', '${data[i].stock}')" class="btn sm:text-xs sm:ml-1 sm:px-1 sm:py-1 lg:px-4 lg:py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded">Add to cart</button>
                    </div>
                </div>
            </div>
            
            `
        }
    });
});

