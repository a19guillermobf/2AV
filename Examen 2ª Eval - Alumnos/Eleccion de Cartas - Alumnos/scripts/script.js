/**<figure>
 *  <img id=" " src=" ">
 * </figure>
 */
// Com este addeventlistener nom me deixava seleccionar o de insertar, 
// puxem defer no html
//document.addEventListener("DOMContentLoaded",e=>{


/**Crear estrutura de datos */
let cartas = []

/**Onde se vam meter as figuras */
let figuras = document.querySelector("#figuras");
/**Os botons */
let engadir = document.querySelector("#addCarta");
let borrar = document.querySelector("#delCarta");
let realizar = document.querySelector("#btnOperar");
/**O pau */
let pau = document.querySelector("#palo");
/**O número da carta */
let numero = document.querySelector("#numero");
/**As opçons de checked */
let insertaSustitue = document.getElementsByName("operacion");
/**posicion da carta que se quere sustituir 
 * vai haver que ir incluindo dentro desto
 * <option value="x">x</option>
*/
let posicion = document.querySelector("#ncartas");

/**Formulario, pois di que é null*/
let formulario = document.querySelector("#formulario");

/**Engade umha carta ao cartas */
function engadeCartas(){
    cartas.push(`${pau.value}${numero.value}`);
    //cartas[`${pau.value}${numero.value}`]=`${pau.value}${numero.value}`;
}


/**Revisa se existe a carta */
function existeCarta(id){
    let existe = false;
    cartas.forEach(carta=>{
        if(carta==id) existe=true;
    })
    return existe;
}

/**Pinta no html o array de cartas */
function pintaCartas(){
    let fragmento = document.createDocumentFragment();
    cartas.forEach(carta=>{
        let figura = document.createElement("figure");
        let imagem = document.createElement("img");
        imagem.src=`./imagenes/${carta}.png`
        figura.appendChild(imagem);
        fragmento.appendChild(figura);
    })
    figuras.appendChild(fragmento);
}

/**Inserta carta antes de umha possiçom dada
 */
function insertaCarta(id,pos){
    let temporal = cartas.splice(pos-1);
    cartas.push(id);
    temporal.forEach(el=>{
        cartas.push(el);
    })
}

/**Borra umha carta que coincida co pau e o número sinalado no html */
function borraCartas(id){
    for(let i=0;i<cartas.length;i++){
        if(cartas[i]==id && cartas.length == 1){
            cartas.pop();
        } else if(cartas[i]==id) {
            /**Metodo pouco efectivo de borrar */
            let temporal = cartas.splice(i);
            temporal.shift();
            temporal.forEach(el=>{
                cartas.push(el);
            })
        }
    }
}

/**Substituir carta, passa-se possiçom e id */
function substitueCarta(id,pos){
    let temporal = cartas.splice(pos-1);
    temporal[0]=id;
    temporal.forEach(el=>{
        cartas.push(el);
    })
}

/**Cubre os números de Carta núm, segundo a longitude do 
 *array cartas <option value="x">x</option>
 */
function cubreNumeros(){
    posicion.innerHTML="";
    for(let i=1;i<=cartas.length;i++){
        let opcion = document.createElement("option")
        opcion.value=i;
        opcion.textContent=i;
        posicion.appendChild(opcion);
    }
}
/*
formulario.addEventListener("click",evento=>{
    evento.preventDefault();
    if(evento.target == engadir){
        console.log("Premido engadir")
        //Se a carta esta na mesa mostra um alert 
        if(existeCarta(`${pau.value}${numero.value}`)){
            alert("A carta já está na mesa");
        } else {
            figuras.innerHTML="";
            engadeCartas();
            cubreNumeros();
            pintaCartas();
        }
    } else if(evento.target == borrar){
        //Se a carta nom existe, mostra-se alert de que nom está na mesa
        console.log("Premido borrar")
        if(!existeCarta(`${pau.value}${numero.value}`)){
            alert("A carta nom está na mesa");
        } else {
            borraCartas(`${pau.value}${numero.value}`);
            figuras.innerHTML="";
            cubreNumeros();
            pintaCartas();
        }
    } else if(evento.target == realizar){
        console.log("Premido realizar")
        // Se está checkado insertar, inserta, se está substituir substitue
        if(insertaSustitue[0].checked){
            if(existeCarta(`${pau.value}${numero.value}`)){
                alert("A carta já está na mesa")
            } else{
                insertaCarta(`${pau.value}${numero.value}`,posicion.value);
                figuras.innerHTML="";
                cubreNumeros();
                pintaCartas();
            } 
        } else if(insertaSustitue[1].checked){
            if(existeCarta(`${pau.value}${numero.value}`)){
                alert("A carta já está na mesa")
            } else {
                substitueCarta(`${pau.value}${numero.value}`,posicion.value)
                figuras.innerHTML="";
                cubreNumeros();
                pintaCartas();
            } 
        }
    }
})
*/
engadir.addEventListener("click",evento=>{
    evento.preventDefault();
    console.log("Premido engadir")
    //Se a carta esta na mesa mostra um alert 
    if(existeCarta(`${pau.value}${numero.value}`)){
        alert("A carta já está na mesa");
    } else {
        figuras.innerHTML="";
        engadeCartas();
        cubreNumeros();
        pintaCartas();
    }
})
borrar.addEventListener("click",evento=>{
    evento.preventDefault();
    //Se a carta nom existe, mostra-se alert de que nom está na mesa
    console.log("Premido borrar")
    if(!existeCarta(`${pau.value}${numero.value}`)){
        alert("A carta nom está na mesa");
    } else {
        borraCartas(`${pau.value}${numero.value}`);
        figuras.innerHTML="";
        cubreNumeros();
        pintaCartas();
    }
})
realizar.addEventListener("click",evento=>{
    evento.preventDefault();
    console.log("Premido realizar")
    // Se está checkado insertar, inserta, se está substituir substitue
    if(insertaSustitue[0].checked){
        if(existeCarta(`${pau.value}${numero.value}`)){
            alert("A carta já está na mesa")
        } else{
            insertaCarta(`${pau.value}${numero.value}`,posicion.value);
            figuras.innerHTML="";
            cubreNumeros();
            pintaCartas();
        } 
    } else if(insertaSustitue[1].checked){
        if(existeCarta(`${pau.value}${numero.value}`)){
            alert("A carta já está na mesa")
        } else {
            substitueCarta(`${pau.value}${numero.value}`,posicion.value)
            figuras.innerHTML="";
            cubreNumeros();
            pintaCartas();
        } 
    }
 
})
//})