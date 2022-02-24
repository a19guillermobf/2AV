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
        td[0].textContent = livro.titulo
        //console.log(td[0].textContent)
        console.log(titulo.value)
        td[1].textContent = livro.autor
        //console.log(td[1].textContent)
        //console.log(livro.autor.value)
        td[2].textContent = livro.isbn
        //console.log(td[2].textContent)
        //console.log(livro.isbn.value)
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
    tbody.innerHTML = ""
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
        id : new Date().getTime()
    }
    livros.push(livro)
}

function actualizaSessionStorage(){
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
 /**os tres addeventlisteners que hai que fazer, vou fazer primeiro o 
  * de cando carrega a página, assi depois já pode que me quede
  * mais claro o que fazer nos outros
  */

 /**Entom, neste caso, o evento é sobre o prórpio objeto document */
 document.addEventListener("DOMContentLoaded", e=>{
     /**Se os datos estam gardados recupera-os */
     if(sessionStorage.getItem("livros")){
         /**Com este parse converte a cadea de texto que tinhamos gardada
          * à estrutura de datos JSON ca que trabalhamos
          */
         livros = JSON.parse(sessionStorage.getItem("livros"))
         /**E agora teria que pintar os datos na página */
         insertaLivros()
     }
 })

 /** Agora seria o adeventlistener do submit, que teria que:
  * comprovar que todos os campos estejam cubertos, se nom lança 
  * um alert indicando que se devem cubrir
  * comprovar que o isbn metido nom está repetido
  */
 formulario.addEventListener("submit",evento=>{
     evento.preventDefault();
     /**Revisa se se repite o isbn, se nom se repite deixa-o em false
      * se si, cambia-o a true
     */
     let controlisbn = false
     livros.forEach(livro => {
         if(livro.isbn == isbn.value){
             controlisbn = true;
         }
     });
     if(titulo.value == "" || autor.value == "" || isbn.value == ""){
         alert("Revisa os campos. Todos devem estar cubertos")
    /** Agora teria que iterar por todo o array e comprovar que nom 
     * exista outro isbn igual
     */
     } else if(controlisbn) {
        alert("Um livro com este ISBN já está registrado")
     } else {
         /**Se está correcto, hai que meter o livro no array de livros
          * hai que actualizar os datos que se gardam no navegador
          * e hai que pintar de novo a tabua com todos os livros
          * A primeira parte faina engadeLivro() e a segunda insertaLivros()
          */
         engadeLivro()
         insertaLivros()
         actualizaSessionStorage()
         /**Restarura os valores dos input */
         titulo.value = ""
         autor.value = ""
         isbn.value = ""
     }
 })

 /**E agora um addeventlisterne para borrar entradas. O botom que fai que se 
  * borre é um X dentro de um a, em cada linha. Usando a maravilhosa opçom
  * de event.target, podemos ponher o escoitador em tbody, para cada click
  * e que actue só cando clicka nos a
  */
 tbody.addEventListener("click",evento=>{
     evento.preventDefault()
     /**Agora bem a parte na que usavamos o tema do dataset 
      * Entom, se o elemento que se clicka tem um data-id
      * recorre todo o array e elimina a entrada com essa id
      * logo igual que no anterior, executa as duas funçons para
      * atualizar e pintar todo
     */
    if(evento.target.dataset.id){
        /**No foreach, a funçom de callback tem o elemento co que se está
         * trabalhando em cada volta, o indice, e poderia-se-lhe passar outro
         * array, que agora nom compre
         */
        livros.forEach((livro,indice) => {
            /**Entom, ca funçom splice, se lhe passamos o índice
             * e o número de elementos a borrar borra-se esse elemento
             * em concreto.
             * Juliam busca o indice com libros.findIndex(el=>el.id==evento.target.dataset.id)
             * que parece bastante mais elegante e eficiente
             */
            if(livro.id == evento.target.dataset.id){
                livros.splice(indice,1);
            }
        });
        //engadeLivro()
        actualizaSessionStorage()
        insertaLivros()
    }
 })

 /**Idea/proposta para outro momento
  * Fazer este exercicio com classes
  * creando umha classe livro cos seus setter e getteres e contructor e tal
  * e umha classe UI ou interface, que seria a que teria métodos como
  * addLivro, actualizasession etc, a essa classe passaria-se-lhe um objeto
  * livro para que trabalhara com el, e internamente teria a estrutura
  * libros, que iria armazenando objetos livro
  */