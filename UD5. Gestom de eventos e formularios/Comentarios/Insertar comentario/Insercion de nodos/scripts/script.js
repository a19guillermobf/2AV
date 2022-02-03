/** Primeiro engade-se este escoitador que fai que
 * nom se execute o script até que se carregue completamente a
 * página
 */

document.addEventListener("DOMContentLoaded",e=>{
    /**Deveria recolher:
     * o que hai em comentarios, no text área
     * O que hai no radio, para saber se é engadir ou eliminar
     * O que hai no despregável de comentario num
     * O que hai no radio de insertar antes de
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
        /** Se nom se passa umha possiçom, engade no final*/
        if (!posicion){
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
            /**Se nom, quere dizer que se passou umha possiçom, entom, deveria engadir o artigo na possiçom -1 e renumerar o resto */
            let numero = recolheSelect().selectedIndex;
            h4.appendChild(document.createTextNode(`Comentario ${numero}`));
            /**Recolhe*/
            /**Engade ao artigo, primeiro o h4, logo o parágrafo, e logo a comentarios o artigo */
            artigo.appendChild(h4);
            artigo.appendChild(parrafo);
            comentarios.appendChild(artigo);

            /**Agora haveria que buscar a forma de mete-lo aí no medio, e renomear os h4 do resto... */

        }

        /**
         * Quedaria tamém, borrar comentario da posiçom indicada
         * 
         * Suponho que nalgúm momento haverá que atualizar os números da lista, pero isso pode ser já no eventlistener do 
         * botom
         * A idea que tinha era, fazer esse eventlistener e aí dentro, em funçom do que haja seleccionado, e para isso usaria as funçons
         * que estou definindo agora, fazer as operaçons oportunas de inserçom/borrado, e logo, antes de sair, actualizar a lista 
         * co número de articles que haja.
         */
    }
    

})