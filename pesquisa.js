
var maxPage  = 0
var categories = new Array()
var botaoPesquisar = document.getElementById("btnPesquisar")
var campoPesquisar = document.getElementById("textoPesquisa")
var campoCategoria = document.getElementById("selectCategories")
var botaoCategoria = document.getElementById("selectPesquisar")

fetch("https://diwserver.vps.webdock.cloud/products")
.then(res => res.json())
.then(data => {
    maxPage = data.total_pages;
})

fetch("https://diwserver.vps.webdock.cloud/products/categories")
.then(res => res.json())
.then(data => {
    categories=data

    var str = "<option selected value=''>Categorias</option>"

    for (let i = 0; i < categories.length; i++) {
        const element = categories[i];

        str += `<option value="${element}">${element}</option>`
        
    }

    document.getElementById("selectCategories").innerHTML=str;
})

var actualpage = document.getElementById("actualpage")

async function carregaProdutos(pesquisa){

    console.log(pesquisa)

    campoCategoria.value=''

    actualpage.value=1

    if(pesquisa==null || pesquisa==undefined || pesquisa==""){

        fetch("https://diwserver.vps.webdock.cloud/products?page="+actualpage.value)
        .then(res => res.json())
        .then(data => {
            let str = ''

            maxPage = data.total_pages;
            actualpage.value = data.current_page;

            for (let i = 0; i < data.products.length; i++) {
                let catalogo = data.products[i]

                let star = retornaEstrelas(catalogo.rating.rate)

                str += ` <div class="col-sm-4 p-2 div-card">
                                <div class="card">
                                    <img src="${catalogo.image}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">${catalogo.title}</h5>
                                        ${star}
                                        <p><a href="#" id="precoMaisVistos" class="btn btn-outline-primary price-detail">${catalogo.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</a>
                                            <a href="detalhes.html?id=${catalogo.id}" class="btn btn-primary details">Mais detalhes</a></p>
                                    </div>
                                </div>
                            </div> `
            }

            document.getElementById('cardPrincipal').innerHTML = str 
        
            pagination()
        })

    }
    else{

        fetch("https://diwserver.vps.webdock.cloud/products/search?query="+pesquisa)
        .then(res => res.json())
        .then(data => {
            let str = ''

            for (let i = 0; i < data.length; i++) {

                let catalogo = data[i]

                let star = retornaEstrelas(catalogo.rating.rate)

                str += ` <div class="col-sm-4 p-2 div-card">
                                <div class="card">
                                    <img src="${catalogo.image}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">${catalogo.title}</h5>
                                        ${star}
                                        <p><a href="#" id="precoMaisVistos" class="btn btn-outline-primary price-detail">${catalogo.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</a>
                                            <a href="detalhes.html?id=${catalogo.id}" class="btn btn-primary details">Mais detalhes</a></p>
                                    </div>
                                </div>
                            </div> `

            }

            document.getElementById('cardPrincipal').innerHTML = str 
        })

        document.getElementById("pagination").style.display='none'


    }

}


async function carregaCategoria(pesquisa,numpage){

    console.log(pesquisa)

    if(pesquisa==null || pesquisa==undefined || pesquisa==""){
        
        carregaProdutos(campoPesquisar.value)

    }
    else{

        campoPesquisar.value=''
        fetch("https://diwserver.vps.webdock.cloud/products/category/"+pesquisa+(numpage!="" ? "?page="+numpage : ""))
        .then(res => res.json())
        .then(data => {
            let str = ''

            maxPage = data.total_pages;
            actualpage.value = data.current_page;

            for (let i = 0; i < data.products.length; i++) {
                let catalogo = data.products[i]

                let star = retornaEstrelas(catalogo.rating.rate)

                str += ` <div class="col-sm-4 p-2 div-card">
                                <div class="card">
                                    <img src="${catalogo.image}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">${catalogo.title}</h5>
                                        ${star}
                                        <p><a href="#" id="precoMaisVistos" class="btn btn-outline-primary price-detail">${catalogo.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</a>
                                            <a href="detalhes.html?id=${catalogo.id}" class="btn btn-primary details">Mais detalhes</a></p>
                                    </div>
                                </div>
                            </div> `
            }

            document.getElementById('cardPrincipal').innerHTML = str 

            pagination()

        })


    }

}

function retornaEstrelas(number){

    let num_int = parseInt(number)

    let ret = ""

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

    return ret;

}

function pagination(){

    document.getElementById("pagination").style.display='flex'

    let pag = document.getElementById("pagination")

    var str = ""

    if(maxPage==1){

        document.getElementById("pagination").style.display='none'

    }

    if(actualpage.value>=maxPage){

        str = `<li class="page-item">
                        <a class="page-link" href="#pagination" aria-label="Previous" onclick="paginationChange(${Number(actualpage.value)-2})">
                        <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#pagination" onclick="paginationChange(${Number(actualpage.value)-2})">${Number(actualpage.value)-2}</a></li>
                    <li class="page-item"><a class="page-link" href="#pagination" onclick="paginationChange(${Number(actualpage.value)-1})">${Number(actualpage.value)-1}</a></li>
                    <li class="page-item"><a class="page-link" href="#pagination" onclick="paginationChange(${Number(actualpage.value)})">${Number(actualpage.value)}</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#pagination" aria-label="Next" onclick="paginationChange(${Number(actualpage.value)})">
                        <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>`

    }
    else if(actualpage.value>2){

        str = `<li class="page-item">
                        <a class="page-link" href="#pagination" aria-label="Previous" onclick="paginationChange(${Number(actualpage.value)-1})">
                        <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#pagination" onclick="paginationChange(${Number(actualpage.value)-1})">${Number(actualpage.value)-1}</a></li>
                    <li class="page-item"><a class="page-link" href="#pagination" onclick="paginationChange(${Number(actualpage.value)-1})">${actualpage.value}</a></li>
                    <li class="page-item"><a class="page-link" href="#pagination" onclick="paginationChange(${Number(actualpage.value)+1})">${Number(actualpage.value)+1}</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#pagination" aria-label="Next" onclick="paginationChange(${Number(actualpage.value)+1})">
                        <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>`

    }
    else{

        if(actualpage.value==1){

            str = `<li class="page-item">
                            <a class="page-link" href="#pagination" aria-label="Previous" onclick="paginationChange(1)">
                            <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#pagination" onclick="paginationChange(1)">1</a></li>
                        <li class="page-item"><a class="page-link" href="#pagination" onclick="paginationChange(2)">2</a></li>
                        <li class="page-item"><a class="page-link" href="#pagination" onclick="paginationChange(3)">3</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#pagination" aria-label="Next" onclick="paginationChange(2)">
                            <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>`
        }
        else{

            str = `<li class="page-item">
                    <a class="page-link" href="#pagination" aria-label="Previous" onclick="paginationChange(1)">
                    <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item"><a class="page-link" href="#pagination" onclick="paginationChange(1)">1</a></li>
                <li class="page-item"><a class="page-link" href="#pagination" onclick="paginationChange(2)">2</a></li>
                <li class="page-item"><a class="page-link" href="#pagination" onclick="paginationChange(3)">3</a></li>
                <li class="page-item">
                    <a class="page-link" href="#pagination" aria-label="Next" onclick="paginationChange(3)">
                    <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>`
        }

    }

    pag.innerHTML = str;

}

function paginationChange(numpage){

    actualpage.value=numpage

    carregaCategoria(campoCategoria.value,numpage)

    pagination()

}

carregaProdutos("");

pagination();

botaoPesquisar.addEventListener("click", function(e){carregaProdutos(campoPesquisar.value)})
botaoCategoria.addEventListener("click", function(e){carregaCategoria(campoCategoria.value,1)})