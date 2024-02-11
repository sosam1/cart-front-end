function addToCart(id, stock) { 
    console.log(id)
    console.log(stock)

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

document.addEventListener("DOMContentLoaded", function() {
  
const URL = "http://127.0.0.1:4000/products";

container = document.getElementById("items-container");

fetch(URL)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        //show the first 4

        for(let i=0; i<4; i++){
            
            container.innerHTML += `
            
            <div id="item${i}" class="btn hover:transform hover:-translate-y-5 transition duration-300 product-container flex flex-col bg-white rounded-lg overflow-hidden shadow-lg sm:mx-2 lg:mx-auto">
                <img class="w-full h-64 object-cover" src="${data[i].imagen}" alt="Producto">
                <div class="p-6">
                    <h2 class="sm:text-sm lg:text-xl font-semibold text-gray-800 mb-2">${data[i].modelo}</h2>
                    <p class="text-gray-600">${data[i].marca}</p>
                    <p class="text-gray-600 mb-4">${data[i].stock} disponibles</p>
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

