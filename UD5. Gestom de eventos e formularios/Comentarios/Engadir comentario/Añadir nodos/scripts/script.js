/** Primeiro engade-se este escoitador que fai que
 * nom se execute o script até que se carregue completamente a
 * página
 */

document.addEventListener("DOMContentLoaded",e=>{
    /** Recolho o apartado onde se vam insertar os comentários novos */
    let comentarios = document.getElementById("comentarios");
    /** Recolho o formulario, também se poderia recolher com
     * document.querySelector("form") → Que recolheria o primeiro do DOM, e neste caso valeria
     * document.querySelectorAll("form")[0] → Que recolheria o primeiro de todos os formularios
     */
    let formulario = document.getElementsByTagName("form")[0];
    /** Recolhe o primeiro textare, pa este caso válenos */
    let textArea= document.querySelector("#textArea")
    
    /** Um contador para ir nomeando os comentários */
    let contador = 0;

    /**escoitador para cando se fai um submit do formulario */
    formulario.addEventListener('submit',evento=>{
        /**Crea os elementos, pero nom os mete em lado nengum, creo */
        let artigo = document.createElement("article")
        let h4 = document.createElement("h4")
        let parrafo=document.createElement("p")
        //parrafo.innerHTML=textArea.value
        /**O texto dentro do p ou do h4 ou assi, é um textNode, nom um 
         * elemento, polo que o jeito de crea-lo é assí
         * Hai que crear dous, um para o h4 e outro para o parágrafo
         */
        let textop=document.createTextNode(textArea.value)
        contador++
        let textoh4=document.createTextNode(`Comentario ${contador}`)
        /** Agora, ao parágrafo, crea-se-lhe um filho, que vai ser o textop */
        parrafo.appendChild(textop)
        /** A H4 o mesmo, com texto h4 */
        h4.appendChild(textoh4)
        /** Agora hai que engadir o H4 e logo o parágrafo ao article */
        artigo.appendChild(h4)
        artigo.appendChild(parrafo)
        /** E por último engadir o article ao apartado de comentarios */
        comentarios.appendChild(artigo)

        /**A maiores, suponho que haverá que borrar o que hai em textarea */
        textArea.value=""
    })
})
