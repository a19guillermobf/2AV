/** Entendo que este é igual que o de insertar comentarios, pero ao recolher os radio, pode haver umha opçom mais
 * que seria a de substituir, neste caso, teria que, se está esse radio marcado,
 * colher o número do select e cambiar o texto 
 */

 document.addEventListener("DOMContentLoaded",e=>{
    /**Deveria recolher:
     * o que hai em comentarios, no text área
     * O que hai no radio, para saber se é engadir ou eliminar ou substituir
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

    function engadirComentario(texto,posicion){
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
        /** Se nom se passa umha possiçom, e possiçom é disitinto de 0, que se é 0 reconhece 
         * tamem coma false e entra por aqui, engade no final*/
        if (!posicion && posicion != 0){
            //console.log("Entrou por !posicion "+posicion)
            /** O número do título é a longitude de comentarios +1. COmentarios é um elemento, pero se seleccionamos os articles que tem
             * devolve um nodelist, que podermos contabilizar cantos elementos article tem dentro
            */
            let numero = comentarios.querySelectorAll("article").length+1;
            h4.appendChild(document.createTextNode(`Comentario ${numero}`));
            /**Engade ao artigo, primeiro o h4, logo o parágrafo, e logo a comentarios o artigo */
            artigo.appendChild(h4);
            artigo.appendChild(parrafo);
            comentarios.appendChild(artigo);

        } else {
            //console.log("Entrou por else "+posicion)
            /**Se nom, quere dizer que se passou umha possiçom x, entom, deveria engadir o artigo na possiçom x e renumerar o resto */
            h4.appendChild(document.createTextNode(`Comentario ${posicion+1}`));
            /**Recolhe*/
            /**Engade ao artigo, primeiro o h4, logo o parágrafo */
            artigo.appendChild(h4);
            artigo.appendChild(parrafo);
            /**Agora haveria que buscar a forma de mete-lo artigo aí no medio dos outros, e renomear os h4 do resto... */
            /** Polo que vou vendo nos apuntes, o método que me pode valer aquí é insertBefore(novo nodo, nodo) 
             * O que me devolve recolheCOmentarios é um elemento html, creo, e com .querySelectorAll("#comentarios") obtenho
             * um nodeList.
             * entom, se fago um comentarios.insertBefore(artigo,comentarios.querySellectorAll("article")[0])
             * Pois metería este artigo na primeira possiçom, é dizer, inserta-o antes do nodo indicado.
             * 
             * Assí conseguiria mete-lo, logo haveria que renomear os seguintes h4 do resto de nodos.
             * 
             */
             comentarios.insertBefore(artigo,comentarios.querySelectorAll("article")[posicion]);

            /** Agora, para renumerar o resto, pode que com um foreach ou for, que percorra o nodeList desde a possiçom passada
             * e que modifique o contido de h4 de cada nodo, por "comentario e o número que toque"
            */
            
            let comentNodos = comentarios.querySelectorAll("article");
            for (let i = posicion; i< comentNodos.length; i++){
                comentNodos[i].querySelector("h4").textContent = `Comentario ${i+1}`;
            }
        }
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

    /** substitue o comentario
     * Haverá que receber umha possiçom e um texto e em funçom disso, modificar o que hai no parágrafo
    */
   function substituirComentario(texto,posicion){
    document.querySelector("#comentarios").querySelectorAll('p')[posicion].textContent=texto
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
        } else if (radio[2].checked){
            if(posicion == -1) posicion = 0;
            engadirComentario(texto,posicion);
        } else if (radio[3].checked && posicion != -1) {
            substituirComentario(texto,posicion);
        } else {
            alert("Nom existem comentários para substituir");
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