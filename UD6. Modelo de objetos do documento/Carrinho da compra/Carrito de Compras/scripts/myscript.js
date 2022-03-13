/**Primeiro de todo, hai que carregar os datos no div com id="lista-productos"
 * Dentro hai que meter cada objeto na template seguinte
 * <template id="template-producto">
            <div class="col-12 col-sm-4 col-md-3 col-lg-2 mb-3 d-flex justify-content-center">
                <div class="card">
                    <img src="" class="card-img-top" alt="item-producto">
                    <div class="card-body">
                        <h5 class="card-title"></h5>
                        <p class="card-text"></p>
                        <a href="#" class="btn btn-dark">Comprar</a>
                    </div>
                </div>
            </div>
        </template>   
 */
let productos = [
    {
        "precio": 500,
        "id": 1,
        "title": "Café",
        "thumbnailUrl": "https://picsum.photos/id/0/600"
    },
    {
        "precio": 300,
        "id": 2,
        "title": "Pizza",
        "thumbnailUrl": "https://picsum.photos/id/10/600"
    },
    {
        "precio": 100,
        "id": 3,
        "title": "Agua",
        "thumbnailUrl": "https://picsum.photos/id/20/600"
    },
    {
        "precio": 50,
        "id": 4,
        "title": "Sandía",
        "thumbnailUrl": "https://picsum.photos/id/30/600"
    },
    {
        "precio": 10,
        "id": 5,
        "title": "Mango",
        "thumbnailUrl": "https://picsum.photos/id/40/600"
    },
    {
        "precio": 150,
        "id": 6,
        "title": "Chela",
        "thumbnailUrl": "https://picsum.photos/id/50/600"
    }
]

let listaProdutos = document.querySelector("#lista-productos");
/**Recolhe a template para a lista de produtos*/
let listaProdutosTemplate = document.querySelector('#template-producto').content
function pintaProdutos(){
    /**Crea um fragmento onde vai ir gardando os datos */
    let fragmento = document.createDocumentFragment();    
    /**Percorre todos os produtos, e em cada um fai um clone da teplate, engade os datos e 
     * engade ao fragmento
     */
    productos.forEach(produto => {
        let productoTemplate = listaProdutosTemplate.cloneNode(true);
        console.log(produto.thumbnailUrl)
        productoTemplate.querySelector("img").scr=`${produto.thumbnailUrl}`;
        productoTemplate.querySelector("h5").textContent=produto.title;
        productoTemplate.querySelector("p").textContent=produto.precio;
        fragmento.appendChild(productoTemplate);
    });
    listaProdutos.appendChild(fragmento);
}

/**NOM METE OS SCR E NOM ME TEM SENTIDO CAGHONDIOLA!!!! */