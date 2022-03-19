/**Cada campo do formulário tem um id, assiq recolho cada um deles, e também o próprio formulario*/
let nif = document.querySelector("#nif");
let nome = document.querySelector("#nombre");
let telefone = document.querySelector("#tfno");
let rua = document.querySelector("#calle");
let localidade = document.querySelector("#localidad");

let importe = document.querySelector("#cantidad");
let queijo = document.querySelector("#quesos");
let hawai = document.querySelector("#hawaii");
let barbacoa = document.querySelector("#barbacoa");
let mozzarella = document.querySelector("#extra1");
let tomate = document.querySelector("#extra2");
let anana = document.querySelector("#extra3");
let champis = document.querySelector("#extra4");
let olivas = document.querySelector("#extra5");

let data = document.querySelector("#fecha");
let recolhida = document.getElementsByName("recogida");

/** Um objeto ou algo assi que garde as unidades ou algo assi??*/

let pedido = {
    pizzas:{
        queijo:0,
        hawai:0,
        barbacoa:0
    },
    extra:{
        mozzarella:false,
        tomate:false,
        anana:false,
        champis:false,
        olivas:false
    },
    data:{
        maisdeumhasemana:false
    },
    recolhida:{
        local:true,
        domicilio:false
    },
    localidade:{
        ferrol:true,
        narom:false,
        fene:false,
        neda:false
    }
}

/**Para o do calendario hai que engadir um atributo min="2022-03-18" ou a data que seja, com esse
 * formato, é dizer, para os meses e os dias tem que levar duas cifras
 * Ademais, Actualiza o campo ao dia de hoje
*/
function restringeCalendario(){
    let dataactual = new Date();
    let ano = dataactual.getFullYear();
    let mes;
    if(dataactual.getMonth()<9){
        mes = `0${dataactual.getMonth()+1}`
    } else {
        mes = `${dataactual.getMonth()+1}`
    }
    let dia;
    if(dataactual.getDate()<10){
        dia = `0${dataactual.getDate()}`
    } else {
        dia = `${dataactual.getDate()}`
    }
    data.setAttribute("min",`${ano}-${mes}-${dia}`);
    data.value=`${ano}-${mes}-${dia}`;
}

/**Pois entom agora podo fazer umha funçom que atualice o estado dos datos */
function actualizaDatosPedido(){
    pedido.pizzas.queijo=parseFloat(queijo.value);
    pedido.pizzas.hawai=parseFloat(hawai.value);
    pedido.pizzas.barbacoa=parseFloat(barbacoa.value);
    pedido.extra.mozzarella=mozzarella.checked;
    pedido.extra.tomate=tomate.checked;
    pedido.extra.anana=anana.checked;
    pedido.extra.champis=champis.checked;
    pedido.extra.olivas=olivas.checked;
    /**Comprova se a data é superior a umha semana. Se nom hai data seleccionada, o data.value
     * vai ser um string sem nada, se nom é algo do estilo "2022-03-18"
     */
    
    if(data.value==""){
        pedido.data.maisdeumhasemana=false;
    } else {
        let diaactual=new Date();
        let diaseleccionado=new Date(data.value);
        /**getTime devolve os milisegundos desde nom sei que data, restando e depois passando a dias obtemos os dias de diferença */
        let diferencia=(diaseleccionado.getTime()-diaactual.getTime())/1000/60/60/24;
        diferencia>=7 ? pedido.data.maisdeumhasemana=true : pedido.data.maisdeumhasemana=false;
    }
    recolhida[0].checked ? pedido.recolhida.local=true : pedido.recolhida.local=false;
    recolhida[1].checked ? pedido.recolhida.domicilio=true : pedido.recolhida.domicilio=false;
    /**Para a localidade, se é 0 → Ferrol, 1 → Narom, 2 → Fene, 3 → Neda*/
    switch(localidade.value){
        case "0": pedido.localidade.ferrol = true;pedido.localidade.narom = false;pedido.localidade.fene = false;pedido.localidade.neda = false;
        break;
        case "1": pedido.localidade.ferrol = false;pedido.localidade.narom = true;pedido.localidade.fene = false;pedido.localidade.neda = false;
        break;
        case "2": pedido.localidade.ferrol = false;pedido.localidade.narom = false;pedido.localidade.fene = true;pedido.localidade.neda = false;
        break;
        case "3": pedido.localidade.ferrol = false;pedido.localidade.narom = false;pedido.localidade.fene = false;pedido.localidade.neda = true;
        break;
        default: console.log("default")
    }
}

/**Agora umha que calcule o total e o asigne a importe no html */
function calculaTotal(){
    /**Primeiro fai a conta toda e depois aplica os descontos se procede, primeiro as pizzas em si*/
    let total=pedido.pizzas.queijo*5+pedido.pizzas.hawai*7+pedido.pizzas.barbacoa*5;
    /**Ingredientes extra */
    if(pedido.extra.mozzarella)total+=1;
    if(pedido.extra.tomate)total+=1;
    if(pedido.extra.anana)total+=1;
    if(pedido.extra.champis)total+=1;
    if(pedido.extra.olivas)total+=1;
    /**Recolhida, se está escolhido a domicilio revisa a onde */
    if(pedido.recolhida.domicilio){
        if(pedido.localidade.narom || pedido.localidade.fene)total+=1;
        if(pedido.localidade.neda)total+=2
    }
    /**Descontos, se som mais de 3 pizzas e o pedido é para dentro de umha semana ou mais 30%
     * Se nom, se é alguma das duas só, 10% ou 20% respetivamente
     */
    if(pedido.data.maisdeumhasemana && (pedido.pizzas.queijo+pedido.pizzas.hawai+pedido.pizzas.barbacoa)>3){
        total=total-30*total/100
    } else if (pedido.data.maisdeumhasemana){
        total=total-20*total/100
    } else if ((pedido.pizzas.queijo+pedido.pizzas.hawai+pedido.pizzas.barbacoa)>3){
        total=total-10*total/100
    }
    /**Actualiza o valor de total no html, com to fixed, que redondea a 2 decimais  */
    importe.textContent=total.toFixed(2);
}

/**E outro para o de se hai umha ou mais pizzas seleccionadas?? Seram funçons de mais? 
 * -Mentras nom haja 1 pizza seleccionada, nom se podem seleccionar ingredientes extra e tampouco cambiar recolhida */
function comprovaPizzasSeleccionadas(){
    let checkboxes = document.querySelectorAll("[type='checkbox']");
    if(pedido.pizzas.queijo+pedido.pizzas.queijo+pedido.pizzas.queijo>1){
        checkboxes.forEach(check=>{
            check.disabled=false;
        })
        recolhida.forEach(check=>{
            check.disabled=false;
        })
    } else {
        checkboxes.forEach(check=>{
            check.disabled=true;
        })
        recolhida.forEach(check=>{
            check.disabled=true;
        })
    }
}

/**Agora poderia ir um que validara as restriçons do formulario, que seriam:
 * -O formulario deve validar que estejam todos os datos bem metidos, mentras volve o cursor ao primeiro dos que estejam mal
 * -- Valida dni com 8 numeros e 1 letra
 * -- nome, letras e epaços entre 2 e 22 dígitos
 * -- telefone 9 números
 * -- Igual ca nome pero sem limites
 * Devolver um valor booleano para saber se rematou bem ou nom??
 */

 function validaFormulario(){
    /**Primeiro fago as regexp para todos os campos, no nif */
    let regnif = new RegExp("^[0-9]{8}-[A-Z]$")
    let regnome = new RegExp("^[a-z|A-Z|\\s]{2,22}$")
    let regtel = new RegExp("^[0-9]{9}$")
    let regrua = new RegExp("^[a-z|A-Z]|\\s]$")
    let validado=true
    /**Agora por exemplo com um if, vai testando as regexp, se algumha nom se 
     * cumpre, entra e pom o foco sobre ela, e cambia o valor do booleano a false
     * Com elemento.focus() pom o foco, com elemento.blur() retira o foco
     */
    if(!regnif.test(nif.value)){
        nif.focus();
        validado=false;
    } else if(!regnome.test(nome.value)){
        nome.focus();
        validado=false;
    } else if(!regtel.test(telefone.value)){
        telefone.focus();
        validado=false;
    } else if(!regrua.test(rua.value)){
        rua.focus();
        validado=false;
    }
    return validado;
}

/**Por último umha funçom resetea formulario, para me enteder melhor nas provas, pero creo que nom se
 * pide exatamente no exercicio
 */
function reseteaFormulario(){
    nif.value="";
    nome.value="";
    telefone.value="";
    rua.value="";
    localidade.value="0";
    queijo.value="0"
    hawai.value="0"
    barbacoa.value="0"
    mozzarella.checked=false;
    tomate.checked=false;
    anana.checked=false;
    champis.checked=false;
    olivas.checked=false;
    recolhida[0].checked=true;
}

/**Agora penso que já podo ir a polos eventos. Primeiro o de cando carrega a página,
 * que penso que com lançar o de comprova pizzas mais o de restringir o calendario é suficiente
 */
document.addEventListener("DOMContentLoaded",e=>{
    restringeCalendario();
    reseteaFormulario();
    comprovaPizzasSeleccionadas();
})

/**No de submit, teráque coprovar se
 * Actualiza datos, calcula total
 * Se se pideu algumha pizza
 * Nom → Alert indicando que nom se pideu pizza
 * Si → 
 *      Está o formulario corretametne cuberto
 *          Si → Lanza alert de que se enviou corretamente
 *          Nom → Volve ao elemento que está sem cubrir, 
 */

formulario.addEventListener("submit",evento=>{
    evento.preventDefault();
    actualizaDatosPedido();
    calculaTotal();
    if(pedido.pizzas.queijo+pedido.pizzas.queijo+pedido.pizzas.queijo==0){
        alert("Nom pediches ningumha pizza!!");
    } else {
        let comprova = validaFormulario();
        if(comprova) alert("Enviam-se os datos")
    }
})

/**E agora, para ter o total sempre atualizado, igual é algo bestia pero com engadir um evento click ao
 * formulario, e depois lançar as funçons de atualizar os datos, comprovar se hai pizzas seleccionadas e calcular o total
 * já estaria o total actualizado a cada movemento que se faga.
 * 
 * Vale, neste caso é melhor usar o evento change, que se aplica aos elementos input, select e textarea, cando
 *  se fai algumha alteraçom sobre eles. Assi perfecto, porque com click ao cambiar a data do calendário
 * nom atualizava o importe total, havia que fazer outro click
*/
formulario.addEventListener("change",evento=>{
    actualizaDatosPedido();
    comprovaPizzasSeleccionadas();
    calculaTotal();
})
