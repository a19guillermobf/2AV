/** Calculadora de IMC
 * Obtemos altura e peso e calculamos o IMC
 * A altura tem que ser superior a 50 cm
 * Tal e como se ve no vídeo, os input nom som type text, se nom type number
 * e a altura tem um mínimo de 50, polo que entendo que haveria que
 * modificar estes nodos e cambiar-lhe o tipo
 * 
 * A fórmula para o cálculo seria peso em kg / altura em metros, ao quadrado
 * 
 * O resultadado hai-no que incluir em
 * <article id="resultados"></article>
 */

function imc(altura,peso){
    /** A altura vem-nos em cm, hai que passar a metros */
    altura = altura/100;
    let imc = peso/Math.pow(altura,2);
    /**Redondea a 2 decimais */
    return Math.round(imc*100)/100;
}

/**Modifico os input */
let altura = document.querySelector("#altura");
let peso = document.querySelector("#peso");

altura.type="number"
peso.type="number"


/**Recolho o formulario */
let formulario = document.getElementById("formulario");

/**Escoitador para o submit do formulario */

formulario.addEventListener("submit",evento=>{
    evento.preventDefault();
    /** executo a funçom para obter o valor */
    let imc_dato = imc(altura.value,peso.value);
    /** Agora, dependendo do valor do peso e da altura
     * ingressa em resposta
     * Proporciona umha altura válida
     * Proporciona um peso válido
     * IMC: X.XX
     */
    /** Recolho o elemento resposta */
    let resultados = document.querySelector("#resultados");
    console.log(`altura ${altura.value}, peso ${peso.value}, imc ${imc_dato}`)
    if (altura.value < 50){
        resultados.textContent="Proporciona umha altura válida"
    } else if ( peso.value < 10) {
        resultados.textContent="Proporciona um peso válido"
    } else  {
        resultados.textContent=`IMC : ${imc_dato}`
    }
})