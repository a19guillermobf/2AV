/** Vai haver que, poder introduzir livros, e elimina-los
 * Todos os campos tenhem que estar cubertos
 * Nom se poder repetir isbns
 */

/**Recuperar os campos que imos utilizar mais o formulario para */
let formulario = document.querySelector("#libro-form")

let titulo = document.querySelector("#titulo")
let autor = document.querySelector("#autor")
let isbn = document.querySelector("#isbn")
let tbody = document.querySelector("#lista-libros")
/**Parece que co content devolve um nodo DocumentFragment, que
 * depois poderemos copiar com cloneNode e assi aplicar as 
 * funçons de querySelector e demais, coma se fora o objeto document do DOM
*/
let modelo = document.querySelector("#template-libro").content

/**Estrutura de datos onde se vam gardar os livros */
let livros = []

/** Funçom que inserta os elementos na tábua e borra
 * o que havia anteriormente
 */

function insertaLivros(){
    tbody.innerHTML = ""
    /**Crea um fragmento onde vai ir gardando os datos */
    let fragmento = document.createDocumentFragment()
    /**Agora, hai que ir metendo os tr um a um, cos datos dos livros correspondentes
     */
    livros.forEach(livro => {
        /**Clono a plantilha que hai no HTML, que recuperei como modelo */
        let modelolivro = modelo.cloneNode(true);
        /**Recolho todos os tds que hai nessa plantilha, para despois
         * ir-lhe mentendo os datos que correspondem
         */
        let td = modelolivro.querySelectorAll("td")
        td[0].textContent = livro.titulo.value
        td[1].textContent = livro.autor.value
        td[2].textContent = livro.isbn.value
        /** O último td tem dentro um a, e a esse a hai-lhe que
         * estabelecer um data-id (lembra com este procedemento pode-se
         * crear atributos data-xxxxxx para marcar bem marcadinhos 
         * algúns elementos que nos interesem)
         */
        let a = td[3].querySelector("a")
        a.dataset.id = livro.id
        /**Engade este modelolibro que já está cuberto ao fragmento */
        fragmento.appendChild(modelolivro)
    });
    /**Inserta o fragmento no tbody */
    tbody.appendChild(fragmento)
}

/** Funçom que engade um livro à estrutura de datos, tanto ca que trabalhamos
 * coma ca que se vai armazenar no navegador
*/

function engadeLivro(){
    let livro = {
        titulo : titulo.value,
        autor : autor.value,
        isbn : isbn.value,
        id : new Date().getDate()
    }
    livros.push(livro)
    /**Aqui engade com sessionStorage a um armazenamento temporal 
     * no navegador. Com locationStorage poderia armazenar permanentemente.
     * O de JSON é para passar a estrutura de datos que temos convertendo-o
     * numha cadea de texto que segundo entendim é o que admite o navegador
     */
    sessionStorage.setItem("livros",JSON.stringify(livros))
}

/** Faltariam os adeventlisteners para submit, para click de borrar e para
 * cando se carrega a página que revisa se hai algum dato gardado e o recupera
  */