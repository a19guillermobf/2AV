/** Igual que o de insertar comentarios pero retirando a parte onde se podem incluir comentarios
 * em possiçons escolhidas
 */

 document.addEventListener("DOMContentLoaded",e=>{
    /**Deveria recolher:
     * o que hai em comentarios, no text área
     * O que hai no radio, para saber se é engadir ou eliminar
     * O que hai no despregável de comentario num
     * todos os comentarios engadidos
     * Um eventlistener para enviar*/

    function recolheTextArea(){
        return document.querySelector("textarea").value;
    }

    /**Este devolve umha nodeList, que depois, acedendo a cada elelemto e com checked, devolve se está checado ou nom, 
     * recolhe os 3 checks, já que tenhem todos o mesmo nome*/
    function recolheRadio(){
        return document.getElementsByName("nodeAction");
    }

    /** Este pode ou nom ter nada ou ter a seguinte estrutura
     * <select name="select">
            <option value="value1">Value 1</option>
            <option value="value2" selected>Value 2</option>
            <option value="value3">Value 3</option>
       </select>
       e poderiamos acceder ao valor de cada option com document.getElementById("grafCount").options[0].value
       Tamem com document.getElementById("grafCount").selectedIndex, poderiamos saber que número está seleccionado
     */
    function recolheSelect(){
        return document.getElementById("grafCount");
    }

    /**Recolhe todos os comentarios, que se incluem num section com id, Devolve o elemento com esse id.
     */
    function recolheComentarios(){
        return document.querySelector("#comentarios");
    }

    /** Agora, entendo que deveria fazer:
     * engadir comentario no final
     * eliminar comentario, eliminará o do número da lista que se indique
     * engadir comentario nalgumha possiçom concreta
     */

    function engadirComentario(texto){
        /** Recolhe os comentarios */
        let comentarios = recolheComentarios();
        /**O que temos que engadir é umha estrutura como a seguinte
         * 
         * <article>
         *  <h4>Comentario X</h4>
         *  <p>texto</p>
         * </article>
         * 
         * Polo que, haveria que crear estes elementos
         */
        let artigo = document.createElement("article");
        let h4 = document.createElement("h4");
        let parrafo = document.createElement("p");
        /**O texto dentro do p ou do h4 ou assi, é um textNode, nom um 
         * elemento, polo que o jeito de crea-lo é assí
         * Hai que crear dous, um para o h4 e outro para o parágrafo
         */
        let comentario = document.createTextNode(texto);
        /**Engade o texto ao parrafo */
        parrafo.appendChild(comentario);
        /** O número do título é a longitude de comentarios +1. COmentarios é um elemento, pero se seleccionamos os articles que tem
         * devolve um nodelist, que podermos contabilizar cantos elementos article tem dentro
        */
        let numero = comentarios.querySelectorAll("article").length+1;
        h4.appendChild(document.createTextNode(`Comentario ${numero}`));
        /**Engade ao artigo, primeiro o h4, logo o parágrafo, e logo a comentarios o artigo */
        artigo.appendChild(h4);
        artigo.appendChild(parrafo);
        comentarios.appendChild(artigo);

    }


    /** Funçom que borraria o nodo segundo a possiçom indicada
     * Entendo que se devera fazer co metodo remove().
     * 
     * Umha cousa que creo que é assi pero que nom estou seguro é que, cando se assigna 
     * document.querySelector("#comentarios").querySelectorAll('article')
     * a umha variavel, esta é estática e nom deixa modificar bem depois, tendo que assignar a umha segunda 
     * variável, por exemplo a comnetNodos2.
     * Assiq, elimino primeiro e logo creo a variável para nom ter que escrever esse tocho no bucle
     */

    function eliminaComentario(posicion){
        document.querySelector("#comentarios").querySelectorAll('article')[posicion].remove();
		let comentNodos = document.querySelector("#comentarios").querySelectorAll('article');
        for (let i = posicion; i< comentNodos.length; i++){
            comentNodos[i].querySelector("h4").textContent = `Comentario ${i+1}`;
        }
    }
    /**
     * Suponho que nalgúm momento haverá que atualizar os números da lista, pero isso pode ser já no eventlistener do 
     * botom
     * A idea que tinha era, fazer esse eventlistener e aí dentro, em funçom do que haja seleccionado, e para isso usaria as funçons
     * que estou definindo agora, fazer as operaçons oportunas de inserçom/borrado, e logo, antes de sair, actualizar a lista 
     * co número de articles que haja.
     */
    
    /**Recolho o formulario */
    let formulario = document.querySelectorAll("form")[0];

    /**E agora o escoitador para cando se fai click no submit do formulario */
    formulario.addEventListener("submit",evento=>{

        evento.preventDefault();
        /**Recolhe o texto do textarea */
        let texto = recolheTextArea();
        /**Recolhe um nodeList dos radio */
        let radio = recolheRadio();
        /**Recolhe o select, logo haveria que ver cal é o selectedIndex */
        let seleccionado = recolheSelect();
        let posicion = seleccionado.selectedIndex;

        /**Agora, dependendo do que esteja marcado nos radios, engade um comentario ao final, engade um comentario na 
         * possiçom indicada, ou elimina o comentario da possiçom indicada
         */
        if(radio[0].checked){
            engadirComentario(texto);
        } else if (radio[1].checked && posicion == -1 ){
            alert("Nom existem comentários para eliminar");
        } else if (radio[1].checked) {
            eliminaComentario(posicion);
        } 

        /**Agora quedaria refazer o select cos números que tocariam, que seriam o número de articles
         * que existem actualmente. Primeiro elimino todo o que hai dentro de seleccionado, e logo 
         * reconstruo com um for
         */
        seleccionado.innerHTML="";
        for(let i=0;i<recolheComentarios().querySelectorAll("article").length;i++){
            let opcion = document.createElement("option");
            let numero = document.createTextNode(`${i+1}`);
            opcion.value = i+1;
            opcion.appendChild(numero);
            seleccionado.appendChild(opcion);
        }

        /**Borra o que hai em textArea, se fago texto="" nom mo borra, e nom entendo moi bem porque, imagino que será
         * cousa de que gardará como um novo objeto, nom como umha referencia
        */
        document.querySelector("textarea").value = "";
    })

})