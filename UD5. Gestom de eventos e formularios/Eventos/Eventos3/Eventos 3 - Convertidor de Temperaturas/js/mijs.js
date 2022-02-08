/** Haverá que seleccionar o valor dos input type range
 * em funçom disso, cambiar o valor dos span
 * 
 * Entendo que o evento de 1 modifica o outro e que o evento é 
 * onmouseup, ainda que julian di que usou o evento change
 */

let celsius = document.querySelector("#temp1");
let farenheit = document.querySelector("#temp2");

function celsiusFarenheit(g_celsius){
    /**ºF = (ºC*1.8)+32 */
    let g_farenheit= (g_celsius*1.8)+32;
    return Math.round(g_farenheit*100)/100;
}

function farenheitCelsius(g_farenheit){
    /**ºC = (ºF-32)/1.8 */
    let g_celsius=(g_farenheit-32)/1.8;
    return Math.round(g_celsius*100)/100;
}

function cambiarOutputs(g_celsius,g_farenheit){
    let out_celsius = document.querySelector("#out1");
    let out_farenheit = document.querySelector("#out2");
    out_celsius.textContent = g_celsius;
    out_farenheit.textContent = g_farenheit;
}

/**Cando se move a barra de celsius, hai que recolher o valor final de 
 * celsius e calcular os farenheit
 * Ademais, hai que cambiar tanto no output de um coma no de outro o texto que se mostra
 * 
 * Tamém havería que comprovar se o resultado dá mais dos límites que se podem
 * ver, é dizir, nom pode haver mais de 100ºF nem menos de 0ºC
 */ 

celsius.addEventListener("mouseup",evento=>{
    let g_celsius = celsius.value;
    let g_farenheit = celsiusFarenheit(g_celsius);
    farenheit.value=g_farenheit;
    if(g_farenheit >= 100){
        g_celsius = farenheitCelsius(100);
        g_farenheit = 100;
    }
    celsius.value = g_celsius;
    farenheit.value = g_farenheit;
    console.log(`celsius ${g_celsius} e farenheit ${g_farenheit}`)
    cambiarOutputs(g_celsius,g_farenheit);
})

farenheit.addEventListener("mouseup",evento=>{
    let g_farenheit = farenheit.value;
    let g_celsius = farenheitCelsius(g_farenheit);
    celsius.value=g_celsius;
    if(g_celsius<=0){
        g_farenheit = celsiusFarenheit(0);
        g_celsius = 0;
    }
    farenheit.value = g_farenheit;
    celsius.value = g_celsius;
    console.log(`celsius ${g_celsius} e farenheit ${g_farenheit}`)
    cambiarOutputs(g_celsius,g_farenheit);
})

console.log(`Final → celsius ${celsius.value} e farenheit ${farenheit.value}`)