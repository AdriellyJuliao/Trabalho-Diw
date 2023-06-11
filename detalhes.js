//FUNÇÃO PRONTA PARA PEGAR OS PARAMETROS
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function getId(){

    url = window.location.href;

    console.log("url",url)
    console.log("url",url.indexOf("="))
    console.log("url",url.length)

    id = url.substring(url.indexOf("="),url.length)

}

async function carregaProduto(id){

    fetch("https://diwserver.vps.webdock.cloud/products/"+id)
        .then(res => res.json())
        .then(data => {
            let str = ''

            let catalogo = data

            let star = retornaEstrelas(catalogo.rating.rate)

            str =  `<div class="product-div">

                        <div>

                            <img src="${catalogo.image}" class="imagem" alt="...">

                        </div>

                        <div class="infos">

                            <h5 class="card-title">${catalogo.title}</h5>
                            <p class="card-text">${catalogo.description}</p>
                            ${star}
                            <a href="#" id="precoMaisVistos" class="btn btn-outline-primary price-detail">${catalogo.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</a>

                        </div>
            
                    </div>`

            document.getElementById('catalogo').innerHTML = str 

        })

}


function retornaEstrelas(number){

    let num_int = parseInt(number)

    let ret = "<div>"

    for (var i = 0; i < num_int; i++) {
        
        ret += `<i class="bi bi-star-fill" style="font-size: 1rem; color:rgb(220, 190, 84);"></i> `

    }

    if(number>num_int){

        i++;
        ret += `<i class="bi bi-star-half" style="font-size: 1rem; color:rgb(220, 190, 84);"></i> `

    }

    for (var j = 1; j < 5-num_int; j++) {

        ret += `<i class="bi bi-star" style="font-size: 1rem; color:rgb(220, 190, 84);"></i> `
    }

    return ret+"</div>";

}


var id = getParameterByName('id');

carregaProduto(id)