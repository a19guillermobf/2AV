/** Entendo que tenho que recolher
 * o mes e o ano
 * logo pintar umha táboa do mes, fácil y sencilho xD
 * Queda para a casa, para escornear aí cos dates e a tábua
 * Igual umha boa idea seria gardar os datos num array bidimensional
 * ou algo assi, que fora gardando cada 7 dias numha semana, até remate
 * dos dias desse mes?? Sería possível??
 * Mais fácil que fazer moitas comprovaçons?? Queda pa revisar
 */

/** Recolho os elementos que podem ser usados para mostrar os resultados */
let resultados = document.querySelector("#resultados");
let cal = document.querySelector("#cal");
/**Recolho os valores os input, se nom é um número, engade no id resultado "Proporcione um mes|ano correcto*/
let mes = document.querySelector("#mes");
let ano = document.querySelector("#ano");

/** Funçom que determina se um ano é bissexto */
function eBissexto(ano){
    let resultado=false;
    if (ano%4==0 && ano%100!=0){
        resultado=true;
    } else if(ano%4==0 && ano%100==0 && ano%400==0){
        resultado=true;
    }
    return resultado;
}

/** Funçom para construir a tábua 
 * recibe um array bidimensional de X*7
 * X som as semanas assiq, hai que itera-lo x vezes, e dentro de cada iteraçom,
 * iterar de novo para ir metendo os dias da semana.
 * 
*/
function taboa(array_data,ano,mes){
    let nome_mes;
    switch(mes){
        case 0: nome_mes = "Janeiro";break;
        case 1: nome_mes = "Fevereiro";break;
        case 2: nome_mes = "Março";break;
        case 3: nome_mes = "Abril";break;
        case 4: nome_mes = "Maio";break;
        case 5: nome_mes = "Juno";break;
        case 6: nome_mes = "Julho";break;
        case 7: nome_mes = "Agosto";break;
        case 8: nome_mes = "Setembro";break;
        case 9: nome_mes = "Outubro";break;
        case 10: nome_mes = "Novembro";break;
        case 11: nome_mes = "Dezembro";break;
    }
    let tabla = document.createElement("table");
    let titulo = document.createElement("caption");
    titulo.appendChild(document.createTextNode(`${nome_mes} de ${ano}`))
    tabla.appendChild(titulo);
    let thead = document.createElement("thead");
    thead.innerHTML = `<tr><th>Seg</th><th>Ter</th><th>Qua</th><th>Qui</th><th>Sex</th><th>Sab</th><th>Dom</th></tr>`
    tabla.appendChild(thead);
    //let tabla = `<table><caption>${nome_mes} de ${ano}</caption><thead><tr><th>Seg</th><th>Ter</th><th>Qua</th><th>Qui</th><th>Sex</th><th>Sab</th><th>Dom</th></tr></thead><tbody>`
    for (let i = 0; i<array_data.length; i++){
        //tabla+="<tr>"
        let tr = document.createElement("tr")
        for (let j = 0; j< array_data[i].length; j++){
            //tabla+=`<td>${array_data[i][j]}</td>`
            let td = document.createElement("td");
            /**Se é domingo, engade a classe domingo ao td */
            if(j==6 && array_data[i][j] != ""){
                td.classList.add("domingo");
            }
            let valor = document.createTextNode(array_data[i][j]);
            td.appendChild(valor);
            tr.appendChild(td);
        }
        //tabla+="</tr>"
        tabla.appendChild(tr)
    }
    //tabla+="<tbody></table>"
    return tabla;
}

/** Funçom que devolve o último dia do mes */
function fimMes(ano,mes) {
    let dia_fim_mes;
    switch(mes){
        case 0:
        case 2:
        case 4:
        case 6:
        case 7:
        case 9:
        case 11:
            dia_fim_mes = 31;
            break;
        case 3:
        case 5:
        case 8:
        case 10:
            dia_fim_mes = 30;
            break;
        case 1:
            if (eBissexto(ano)){
                dia_fim_mes = 29;
            } else {
                dia_fim_mes = 28;
            }
            break;
    }
    return dia_fim_mes;
}


let formulario = document.querySelector("#formulario");

formulario.addEventListener("submit",evento=>{
    evento.preventDefault();
 
    if (mes.value <= 0 || mes.value >= 13 || mes.value ==""){
        resultados.textContent="Proporcione um mês correto"
    } else if( ano.value == "" ){
        resultados.textContent="Proporcione um ano correto"
    } else {
        /** Co seguinte consigo que a umha data dada, com um fim de mes definido, ir gardando num array outros 
             * arrays cos dias das semanas correspondentes
             */
        let fecha = new Date(parseInt(ano.value),parseInt(mes.value)-1);
        let dia_fim_mes = fimMes(parseInt(ano.value),parseInt(mes.value)-1);
        let array_mes = [];
        let num_semana=0;
        
        /** Estabelece o dia a 1, e a condiçom para sair, que i seja false */
        for (let i = true, num_dia=1; i !=false; ){
            /**Crea o array semana onde se vam ir gardando os valores dos dias */
            let semana = [];
            /** Condicional em tres partes, para a primeira semana, se é é domingo (getDay() igual a 0), e é a última iteraçom
             * mete o valor num_dia que vai ser 1, se nom, se o dia é outro e é maior que j+1, ou é domingo pero ainda nom é a últma iteraçom
             * quere dizir que esse ia vai levar um valor valeiro, e se nom mete o valor do dia com normalidade.
             */
            if(num_semana == 0){
                for(let j = 0; j<7;j++){
                    if (fecha.getDay()==0 && j==6){
                        semana.push(num_dia);
                        num_dia++;
                    }else if(fecha.getDay()>j+1 || fecha.getDay() == 0)	{
                        semana.push("");
                    } else {
                        semana.push(num_dia);
                        num_dia++;
                    }
                }
            /** Se o dia de fim de mes, menos o numero de dia polo que imos restados dam menos de 7 quere dizir que estamos na última semana
             * polo que se o numero de dia é igual ou menor que o número do fim de mes, mete valores com normalidade, se nom mete valeiros
             * Ao final estabelece i a false para que remate o bucle principal
             */
            } else if(dia_fim_mes-num_dia < 7) {
                for(let j=0;j<7;j++){
                    if(num_dia<=dia_fim_mes){
                        semana.push(num_dia);
                        num_dia++;
                    } else {
                        semana.push("");
                    }
                }
                i=false;
            /** Mentras vai ir metendo valores de 7 em 7 */
            } else {
                for(let j=0;j<7;j++){
                    semana.push(num_dia);
                    num_dia++;
                }
            }
            num_semana++;
            array_mes.push(semana);
        }
        /**Se cal tem algo metido, borrao */
        if (cal.firstChild) {cal.removeChild(cal.firstChild)};
        /**Se resultados tem algo metido, borra-o */
        if (resultados.firstChild) {resultados.removeChild(resultados.firstChild)};
        /**Inclue a tábua no html */
        cal.appendChild(taboa(array_mes,parseInt(ano.value),parseInt(mes.value)-1));
    }
})

/**Isto parece que esta metendo bem as cousas. Agora, faltaria o evento focus nos imput, porque
 * parece no video que cando clicka enriba dos input borra todo o que hai embaixo
 */

mes.addEventListener("focus",evento=>{
    evento.preventDefault();
    /**Se cal tem algo metido, borrao */
    if (cal.firstChild) {cal.removeChild(cal.firstChild)};
    /**Se resultados tem algo metido, borra-o */
    if (resultados.firstChild) {resultados.removeChild(resultados.firstChild)};
    /**E o value do input tamem o cambia*/
    mes.value="";
})

ano.addEventListener("focus",evento=>{
    evento.preventDefault();
    /**Se cal tem algo metido, borrao */
    if (cal.firstChild) {cal.removeChild(cal.firstChild)};
    /**Se resultados tem algo metido, borra-o */
    if (resultados.firstChild) {resultados.removeChild(resultados.firstChild)};
    /**E o value do input tamem o cambia*/
    ano.value="";
})