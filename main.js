document.addEventListener("DOMContentLoaded", function() {
  

const URL = "http://127.0.0.1:4000/products";


function hola(id, stock=1) { 
    console.log(id)

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
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    }

container = document.getElementById("items-container");

fetch(URL)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        //show the first 4

        for(let i=0; i<=4; i++){
            
            container.innerHTML += `
            
            <div class="product-container flex flex-col bg-white rounded-lg overflow-hidden shadow-lg sm:mx-2 lg:mx-auto">
                <img class="w-full h-64 object-cover" src="${data[i].imagen}" alt="Producto">
                <div class="p-6">
                    <h2 class="sm:text-sm lg:text-xl font-semibold text-gray-800 mb-2">${data[i].modelo}</h2>
                    <p class="text-gray-600 mb-4">${data[i].marca}</p>
                    <div class="flex items-center justify-between">
                        <span class="sm:text-base lg:text-xl text-gray-900 font-bold">$${data[i].precio}</span>
                        <button class="sm:text-xs sm:ml-1 sm:px-1 sm:py-1 lg:px-4 lg:py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded">Buy now</button>
                    </div>
                </div>
            </div>
            
            
            `

            
        }


    });

});