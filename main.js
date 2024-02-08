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

fetch(URL)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        contenedor = document.getElementById("contenedor");

        data.forEach(element => {

            contenedor.innerHTML += `
                
            <button onclick="hola('${element._id}')">${element.modelo} ${element._id}</button>


            `

        });

    });
