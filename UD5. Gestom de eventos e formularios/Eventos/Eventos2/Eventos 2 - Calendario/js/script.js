/** Entendo que tenho que recolher
 * o mes e o ano
 * logo pintar umha táboa do mes, fácil y sencilho xD
 * Queda para a casa, para escornear aí cos dates e a tábua
 * Igual umha boa idea seria gardar os datos num array bidimensional
 * ou algo assi, que fora gardando cada 7 dias numha semana, até remate
 * dos dias desse mes?? Sería possível??
 * Mais fácil que fazer moitas comprovaçons?? Queda pa revisar
 */

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
function taboa(array_data){
    let tabla = "<table><thead><tr><th>Seg</th><th>Ter</th><th>Qua</th><th>Qui</th><th>Sex</th><th>Sab</th><th>Dom</th></tr></thead><tbody>"
    for (let i = 0; i<array_data.length; i++){
        tabla+="<tr>"
        for (let j = 0; j< array_data[i].length; j++){
            tabla+=`<td>${array_data[i][j]}</td>`
        }
        tabla+="</tr>"
    }
    tabla+="<tbody></table>"
}

/** Funçom que devolve o último dia do mes */
function fimMes(ano,mes) {
    let dia_fim_mes;
    switch(mes){
        case 0,2,4,6,7,9,11:
            dia_fim_mes = 31;
            break;
        case 3,5,8,10:
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
    /**Recolho os valores os input, se nom é um número, engade no id resultado "Proporcione um mes|ano correcto*/
    let mes = document.querySelector("#mes");
    let ano = document.querySelector("#ano");

    /** Co seguinte consigo que a umha data dada, com um fim de mes definido, ir gardando num array outros 
     * arrays cos dias das semanas correspondentes
     */

    let fecha = new Date(ano.value,mes.value);
    let dia_fim_mes = fimMes(ano.value,mes.value);
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
    console.log(array_mes);

    /**
     * fazer a comprovaçom dos input, que seja um número, que os meses nom sejam maiores que 11 e essas cousas
     * igual fazendo um input number com limitaçom por riba e por baixo já valeria
     * assi já namais haveria que verificar que nom esteja valeiro
     * 
     * Meter os resultados, no html
     */

})