/**Incluo na lista de produtos outro campo mais chamado ud que representaria as unidades engadidas de cada pruduto*/
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

/**Recolhe o div onde vai ir a lista de produtos*/
let listaProdutos = document.querySelector("#lista-productos");
/** Recolhe os anacos da tábua carrinho*/
let tbodycarrinho = document.querySelector("#body-carrito");
let tfootercarrinho = document.querySelector("#footer-carrito");

/**Introduze do html os cards dos produtos 
 * Primeiro de todo, hai que carregar os datos no div com id="lista-productos"
 * Dentro hai que meter cada objeto na template correspondente   
 *
*/
function pintaProdutos(){
    /**Recolhe a template de um produto para a lista de produtos*/
    let listaProdutosTemplate = document.querySelector('#template-producto').content
    /**Crea um fragmento onde vai ir gardando os datos */
    let fragmento = document.createDocumentFragment();    
    /**Percorre todos os produtos, e em cada um fai um clone da teplate, 
     * engade os datos e mais um id ao botom, que é um a, com datatarget
     * engade ao fragmento
     */
    productos.forEach(produto => {
        productoTemplate = listaProdutosTemplate.cloneNode(true);
        productoTemplate.querySelector("img").src=produto.thumbnailUrl;
        productoTemplate.querySelector("h5").textContent=produto.title;
        productoTemplate.querySelector("p").textContent=`${produto.precio} €`;
        productoTemplate.querySelector("a").dataset.id=produto.id;
        fragmento.appendChild(productoTemplate);
    });

    listaProdutos.appendChild(fragmento);
}

/**Agora que já se mostram os dados no html, e estam os botons associados a
 * umha id, que é o seguinte?
 * 
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

/**Funçom que engade ou resta umha unidade a um produto, logo com a seguinte
 * pinto a parte do carrinho, se as unidades som 0 já nom as pinta.
 * Passa-se-lhe umha id de produto e um engade, que vai ser um booleano, se é true engade, se é false retira
*/
function modificaUnidadesProduto(id,engade){
    productos.forEach(produto=>{
        if(produto.id == id){
            console.log(produto.ud)
            engade ? produto.ud++ : produto.ud--;
            console.log(produto.ud)
        }
    })
}

/**Funçom que pom a 0 todos os campos ud de todos os produtos */
function reseteaUdsProdutos(){
    productos.forEach(produto=>{
        produto.ud = 0;
    })
}

/** Funçom que pinta a tábua */
function pintaTabuaCarrinho(){
    /**Borra o contido que exista inicialmente */
    tbodycarrinho.innerHTML="";
    tfootercarrinho.innerHTML="";
    /** Variáveis dos totais de unidades e preço que se iram incrementando
     * por cada produto que se engada
     */
    let totaluds = 0;
    let total = 0;
    /**Número de item para o promeiro campo do tbody */
    let num = 1;
    /**Recolhem-se as templates  */
    let templateProdutoCarrinho = document.querySelector("#template-producto-carrito").content;
    let templateFooterCarrinho = document.querySelector("#template-footer-carrito").content; 
    /**Crear os fragmentos */
    let fragmentoProduto = document.createDocumentFragment(true);
    let fragmentoFooter = document.createDocumentFragment(true);
    /**Percorre os produtos, os que tenham ud > 0 serám engadidos à tábua */
    productos.forEach(produto=>{
        if(produto.ud > 0){
            let temporal = templateProdutoCarrinho.cloneNode(true);
            let tds = temporal.querySelectorAll("td");
            tds[0].textContent = num;
            num++;
            tds[1].textContent = produto.title;
            tds[2].textContent = produto.ud;
            tds[3].querySelectorAll("button")[0].dataset.id = produto.id;
            tds[3].querySelectorAll("button")[1].dataset.id = produto.id;
            tds[4].textContent = `${produto.ud*produto.precio} €`;
            totaluds+=produto.ud;
            total+=produto.ud*produto.precio;
            fragmentoProduto.appendChild(temporal);
        }
    })
    tbodycarrinho.appendChild(fragmentoProduto);
    if(totaluds>0){
        let temporalfooter = templateFooterCarrinho.cloneNode(true);
        let tds = temporalfooter.querySelectorAll("td");
        tds[0].textContent = totaluds;
        tds[2].textContent = `${total} €`;
        fragmentoFooter.appendChild(temporalfooter);
        tfootercarrinho.appendChild(fragmentoFooter);
    } else {
        tbodycarrinho.innerHTML='<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>';
    }
}


/**Executa as funçons no inicio */
document.addEventListener("DOMContentLoaded",e=>{
    recuperaDatosSessom();
    pintaProdutos();
    pintaTabuaCarrinho();
})


/**com elemento.classList.contains("classe") podo saber se esse elemento contem umha determinada classe.
 * Útil para comprovar agora que botom se preme
 */
document.addEventListener("click",evento=>{
    /**Se se preme no botom de comprar ou no de +, aumenta umha unidade esse produto */
    console.log(evento.target)
    if(evento.target.classList.contains("btn-dark") || evento.target.classList.contains("btn-info")){
        modificaUnidadesProduto(evento.target.dataset.id,true);
    /**Se se preme o botom com id vaciar-carrito, pom a 0 todos os valores de ud dos produtos, este tem que vir antes
     * pois tem a mesma classe que o botom -
     */
    } else if(evento.target == document.querySelector("#vaciar-carrito")) {
        reseteaUdsProdutos();
    /**Se se preme o botom - resta umha unidade */
    } else if(evento.target.classList.contains("btn-danger")) {
        modificaUnidadesProduto(evento.target.dataset.id,false);
    }
    pintaTabuaCarrinho();
    gardaDatosSessom();
})