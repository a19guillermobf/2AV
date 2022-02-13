/** Hai um formulario com id formulario
 * um input text com name numero1
 * e outro com name numero2
 * 
 * Hai que sumar/restar/multiplicar ou dividir os números que se metam
 * 
 * Para cada operaçom hai um buttom com um id, tamém hai um buttom para borrar
 * 
 * Se cando se lhe da a algum desses botons nom hai números no primeiro ou no 
 * segundo input, devolve na resposta
 * "Proporciona um número na primeira|segunda caixa"
 * 
 * Se hai números, fai a operaçom e devolve 
 * "O resultado da operaçom é: xx.xxx, redondeado a 3 como moito"
 * 
 * a resposta é um p com id resultado
 */

/** Recolhe os controles dos botons dos formularios */

/*let sumar = document.querySelector("#sumar-btn");
let restar = document.querySelector("#restar-btn");
let multiplicar = document.querySelector("#multiplicar-btn");
let dividir = document.querySelector("#dividir-btn");
let borrar = document.querySelector("#reiniciar-btn");*/

/** Funçom que comprova se hai números nas duas caixas, devolve
 * true, ou as cadeas do primeiro ou segundo caixom sem número
 */
function comprovaNumeros(num1,num2){
    let saida;
    if(isNaN(num1) || num1 == ""){
        saida = "Proporciona um número na primeira caixa";
    } else if(isNaN(num2) || num2 == ""){
        saida = "Proporciona um número na segunda caixa";
    } else {
        saida = true;
    }
    return saida;
}

function suma(num1,num2){
    return Math.round((num1+num2)*1000)/1000;
}
function resta(num1,num2){
    return Math.round((num1-num2)*1000)/1000;
}
function multiplicacion(num1,num2){
    return Math.round((num1*num2)*1000)/1000;
}
function division(num1,num2){
    return Math.round((num1/num2)*1000)/1000;
}

/** Fai os eventos e comprovaçons 
 * Primeiro para sumar, o evento é click, nom submit
 * recolhe os numeros, fai a comprovaçom, se
 * cont é true, quere dizer que som números e entom 
 * asigna a resposta o resultado, se nom mete o texto que devolve 
 * comprovaNumeros
*/
/*sumar.addEventListener("click",e=>{
    // Fai que nom se recargue a página logo de premer no botom
    e.preventDefault();
    let num1 = document.getElementsByName("numero1")[0].value;
    let num2 = document.getElementsByName("numero2")[0].value;
    let cont = comprovaNumeros(num1,num2);
    let resultado = document.querySelector("#resultado");
    // Se cont é true 
    if (!isNaN(cont)) {
        resultado.textContent=`O resultado da operaçom é: ${Math.round((parseFloat(num1)+parseFloat(num2))*1000)/1000}`
    } else {
        resultado.textContent=cont;
    }
})

restar.addEventListener("click",e=>{
    // Fai que nom se recargue a página logo de premer no botom
    e.preventDefault();
    let num1 = document.getElementsByName("numero1")[0].value;
    let num2 = document.getElementsByName("numero2")[0].value;
    let cont = comprovaNumeros(num1,num2);
    let resultado = document.querySelector("#resultado");
    //Se cont é true 
    if (!isNaN(cont)) {
        resultado.textContent=`O resultado da operaçom é: ${Math.round((parseFloat(num1)-parseFloat(num2))*1000)/1000}`
    } else {
        resultado.textContent=cont;
    }
})*/

/** O conto aquí, antes de seguir metendo eventos a cada botom, é que.
 * Póde-se recolher por exemplo o parágrafo com id=operaciones
 * que dentro tem todos os botons para as operaçons.
 * 
 * Se a esse elemento que recolhemos lhe assignamos um eventListener de click
 * vai recolher todos os clicks que se fagam dentro del.
 * 
 * seria algo assi
 * operaciones.addEventListener("click",evento=>{
 * 
 * })
 * E agora, hai umha cousa mou chula aqui que é o evento.target, que é o 
 * elemento que produziu o evento. É dizir, que dentro do elemento monitorizado
 * se se fai click em calquera elemento interior, com evento.target sabemos cal
 * foi e com por exemplo, evento.target.id, se tem um id
 * definido, podemo-lo obter.
 * Assiq aqui, poderia-se fazer assi, e logo um switch(evento.target.id){
 *  e aqui um case para cada id de cada operaçom, que execute a operaçom concreta
 * }
 * 
 * Assi, ainda que tamém vai recolher os clicks que se fagam fora dos botons
 * pero dentro do paragrafo operaciones, só vai fazer algo cando seja clickando 
 * nos elementos que estam no switch
 * 
 * Assiq, polo momento so me vale a funçom pa comprovar os números xD
 */

// Recolhe entom o operaciones
let operacions = document.querySelector("#operaciones");

operacions.addEventListener("click",evento=>{
    evento.preventDefault();
    let num1 = document.getElementsByName("numero1")[0];
    let num2 = document.getElementsByName("numero2")[0];
    let cont = comprovaNumeros(num1.value,num2.value);
    let resultado = document.querySelector("#resultado");
    let res;
    if (evento.target.id == "reiniciar-btn"){
        /** Neste caso nom me quedava claro se ao dar-lhe a borrar se tinha que borrar só o do input seleccionado ou 
        * os dous inputs. Fago pa que borre os dous
        */
        num1.value="";
        num2.value="";
        resultado.textContent="";
    }else if (!isNaN(cont)) {
        let n1 = parseFloat(num1.value);
        let n2 = parseFloat(num2.value);
        switch(evento.target.id){
            case "sumar-btn": 
                resultado.textContent=`O resultado da suma é: ${suma(n1,n2)}`;
                break;
            case "restar-btn": 
                resultado.textContent=`O resultado da resta é: ${resta(n1,n2)}`;
                break;
            case "multiplicar-btn": 
                resultado.textContent=`O resultado da multiplicaçom é: ${multiplicacion(n1,n2)}`;
                break;
            case "dividir-btn": 
                resultado.textContent=`O resultado da divissom é: ${division(n1,n2)}`;
                break;

        }
    } else {
        resultado.textContent=cont;
    }
})

/** Por aquí está indo bem. 
 * Pa revisar, a parte de fazer o resto de operaçons, 
 * se o que se lhe passa a comprovaNumeros é umha cadea valeira, ""
 * esta é tratada coma um número, e nom devera, hai que controlar isso
 * Do resto, em principio é só fazer o resto de cases, e funtions associadas
 */