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
        "thumbnailUrl": "https://picsum.photos/id/0/600",
        "ud": 0
    },
    {
        "precio": 300,
        "id": 2,
        "title": "Pizza",
        "thumbnailUrl": "https://picsum.photos/id/10/600",
        "ud": 0
    },
    {
        "precio": 100,
        "id": 3,
        "title": "Agua",
        "thumbnailUrl": "https://picsum.photos/id/20/600",
        "ud": 0
    },
    {
        "precio": 50,
        "id": 4,
        "title": "Sandía",
        "thumbnailUrl": "https://picsum.photos/id/30/600",
        "ud": 0
    },
    {
        "precio": 10,
        "id": 5,
        "title": "Mango",
        "thumbnailUrl": "https://picsum.photos/id/40/600",
        "ud": 0
    },
    {
        "precio": 150,
        "id": 6,
        "title": "Chela",
        "thumbnailUrl": "https://picsum.photos/id/50/600",
        "ud": 0
    }
]

let listaProdutos = document.querySelector("#lista-productos");
/**Recolhe a template para a lista de produtos*/
listaProdutosTemplate = document.querySelector('#template-producto').content
function pintaProdutos(){
    /**Crea um fragmento onde vai ir gardando os datos */
    let fragmento = document.createDocumentFragment();    
    /**Percorre todos os produtos, e em cada um fai um clone da teplate, 
     * engade os datos e mais um id ao botom, que é um a, com datatarget
     * engade ao fragmento
     */
    productos.forEach(produto => {
        productoTemplate = listaProdutosTemplate.cloneNode(true);
        console.log(produto.thumbnailUrl)
        productoTemplate.querySelector("img").scr=produto.thumbnailUrl;
        console.log(productoTemplate.querySelector("img").scr);
        productoTemplate.querySelector("h5").textContent=produto.title;
        productoTemplate.querySelector("p").textContent=`${produto.precio} €`;
        productoTemplate.querySelector("a").dataset.id=produto.id;
        fragmento.appendChild(productoTemplate);
    });

    listaProdutos.appendChild(fragmento);
    /**Por algum motivo que nom comprendo, nom me carrega bem as imagens 
     * no anterior bucle, tenho que meter um novo para as imagens depois
     * de crear e engadir o fragmento ao html
     */
    let a = 0;
    productos.forEach(produto => {
        listaProdutos.querySelectorAll("img")[a].src=produto.thumbnailUrl;
        a++;
    })
}

/**Agora que já se mostram os dados no html, e estam os botons associados a
 * umha id, que é o seguinte?
 * 
 * Podem ser duas funçons e um mesmo evento, click
 * Creando umha nova estrutura de datos, que garde os produtos que hai
 * engadidos, com um campo a maiores, que indique o número de unidades
 * que se engadirom.
 * Logo umha funçom, à que se lhe passe um id, que nessa estrutura de 
 * datos inclua o elemento se nom existe e que aumente o número de unidades. 
 * (Ou mesmo utilizar a mesma estrutura que temos já feita?)
 * 
 * E outra igual pero para, retirar produtos (ou igual a mesma pode fazer
 * as duas cousas??)
 * 
 * Logo, de algum jeito haveria que ir atualizando as cantidades
 * E também gardar os dados na sessom suponho
 */

function recuperaDatosSessom(){
    /**Coma sempre, se hai datos gardados recupera-os e 
     * sobreescreve o que hai
     */
    if(sessionStorage.getItem("produtos")){
        productos = JSON.parse(sessionStorage.getItem("produtos"));
    }
}

function gardaDatosSessom(){
    sessionStorage.setItem("produtos", JSON.stringify(productos));
}

/**Esta funçom, passa-se-lhe o id de um produto, e o engade
 * seria um booleano, se é true é para sumar
 * se é false para restar
 */
function modificaTabuaProdutos(id,engade){

}