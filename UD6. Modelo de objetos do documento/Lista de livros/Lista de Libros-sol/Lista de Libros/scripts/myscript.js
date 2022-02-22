
/**Crea a estrutura de datos que vai usar durante todo o tempo */
let libros=[]

const formulario=document.querySelector("#libro-form")

const titulo=document.querySelector("#titulo")
const autor=document.querySelector("#autor")
const isbn=document.querySelector("#isbn")

const tbody=document.querySelector("#lista-libros")


const templateLibro=document.querySelector("#template-libro").content

/**Esta funçom crea um livro novo, com um id ca data atual */
function addLibro(){
    const libro={
        titulo:titulo.value,
        autor:autor.value,
        isbn:isbn.value,
        id:new Date().getTime()
    }
    libros.push(libro)
    /**Aqui, com sessionStorage armazena "em sessom" a estrutura de datos 
     * libros, tem que converte-lo com stringify a umha cadea para 
     * que se poida armazenar no navegador
     * Se se quixera armazenar para que perdure ainda cando se pecha o navegador
     * seria com locationStorage
     */
    sessionStorage.setItem("libros",JSON.stringify(libros))
    /**Pinta de novo todos os livros */
    renderLibros()
}

/**Esta funçom começa borrando todo o que hai em tbody */
function renderLibros(){
    tbody.innerHTML=""
    /**Logo crea um fragmento com esta funçom, que é como um DOM a
     * parte e que é mais eficiente que usar createElement(), neste caso,
     * pois com createElement() haveria que ir pintando um tr de cada vez
     * e com este, crea-se toda a estrutura fora do DOM e logo pinta-se
     * toda junta
     */
    const fragmento=document.createDocumentFragment()
    /**Entom, logo de fazer o fragmento este, colhe umha template que 
     * vai ter a estrutura que queremos para cada linha da tábua, 
     * clona o nodo para crear um novo elemento
     * e vai engadindo dentro dos td os datos correspondentes
      */
    libros.forEach(libro=>{
        const book=templateLibro.cloneNode(true)
        const tds=book.querySelectorAll("td")
        tds[0].textContent=libro.titulo
        tds[1].textContent=libro.autor
        tds[2].textContent=libro.isbn
        const a=tds[3].querySelector("a")
        /**Com esta ordem crea um atributo no a
         * <a href=# data-id="o id correspondente">
         * assi depois pode-se acceder a este elemento e te-lo relacionado
         * na estrutura de datos libros
         */
        a.dataset.id=libro.id
   /*       a.addEventListener("click",evento=>{
            let n=libros.findIndex(el=>el.id==evento.target.dataset.id)
            libros.splice(n,1)
            renderLibros()
        })*/        
        fragmento.appendChild(book)
    })
    tbody.appendChild(fragmento)
}

/**Este evento é para que cando se dea um click dentro da táboa
 * se o elemento que provoca o evento é um dos a com data-id
 * borra essa entrada, actualiza o que hai gardado no navegador e
 * pinta de novo os livros que hai agora
 */
tbody.addEventListener("click",evento=>{
    evento.preventDefault()
    if (evento.target.dataset.id) {
        let n=libros.findIndex(el=>el.id==evento.target.dataset.id)
        libros.splice(n,1)
        sessionStorage.setItem("libros",JSON.stringify(libros))
    }
    renderLibros()
})

/**Engade novos livros co submit, comprova se existem livros e
 * se o isbn nom está repetido
 */
formulario.addEventListener("submit",eSubmit=>{
    eSubmit.preventDefault()
    if (libros.length) {
        if (libros.find(libro=>libro.isbn==isbn.value))
            alert("El libro ya esta registrado")
        else
            addLibro()
    } else 
        addLibro()
})

/**Este eventlistener ocorre cando se carrega a página
 * e revisa se está gardada a estrutura de datos libros
 * e se está recupera-a a pinta-a
 */
document.addEventListener("DOMContentLoaded",e=>{
    if (sessionStorage.getItem("libros")) {
        libros=JSON.parse(sessionStorage.getItem("libros"))
        renderLibros()
    }
})