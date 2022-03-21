const formulario=document.querySelector("form")
const fieldsets=document.querySelectorAll("fieldset")

const quesos=formulario.quesos;
const hawaii=formulario.hawaii;
const barbacoa=formulario.barbacoa;

const pedido={
    "queso":{n:0,precio:5},
    "hawaii":{n:0,precio:7},
    "barbacoa":{n:0,precio:5},
    "descuentoAbundancia":false,
    "extras":[{nombre:"mozzarella",precio:1,opcion:false},{nombre:"tomate",precio:1,opcion:false},{nombre:"piña",precio:1,opcion:false},{nombre:"champis",precio:1,opcion:false},{nombre:"olivas",precio:1,opcion:false}],
    "localidad": [{nombre:"Ferrol",precio:0,opcion:false},{nombre:"Narón",precio:1,opcion:false},{nombre:"Fene",precio:1,opcion:false},{nombre:"Neda",precio:2,opcion:false}],
    "descuentoFecha":false,
    "recargoPago":false
}

function checkNIF() {
    let expresion=/^\d{8}-[A-Z]{1}$/
    return expresion.test(formulario.nif.value)
}

function checkNombre() {
    let expresion=/^[A-Za-z ]{2,20}$/
    return expresion.test(formulario.nombre.value)
}

function checkTel() {
    let expresion=/^\d{9}$/
    return expresion.test(formulario.tfno.value)
}

function checkCalle() {
   let expresion=/^[A-Za-z ]+$/
   return expresion.test(formulario.calle.value)
}

function enviar(evento) {
    evento.preventDefault();
    if (total>0) {
        if (checkNIF() && checkTel() && checkNombre() && checkCalle()) 
           alert("Se envian los datos")
        else {
            if (!checkNIF())
                formulario.nif.focus()
            else if (!checkNombre())
                formulario.nombre.focus()
            else if (!checkTel())
                formulario.tfno.focus()
            else if (!checkCalle())
                formulario.calle.focus()
        }
    } else {
        alert("No has pedido ninguna pizza !!")
        formulario.reset();
        setDate();
    }
}

function setDate() {
    let hoy=new Date()
    anho=hoy.getFullYear()
    mes=(hoy.getMonth()+1<10)?'0'+(hoy.getMonth()+1):hoy.getMonth()+1
    dia=hoy.getDate()
    fecha.min=`${anho}-${mes}-${dia}`        
    fecha.value=`${anho}-${mes}-${dia}`       
}

function calcularTotal() {
    let total=parseFloat(pedido.queso.n*pedido.queso.precio+pedido.hawaii.n*pedido.hawaii.precio+pedido.barbacoa.n*pedido.barbacoa.precio)
    for (let i=0;i<pedido.extras.length;i++) 
    if (pedido.extras[i].opcion)
        total+=pedido.extras[i].precio
    
    if (pedido.recargoPago)
        for (let i=0;i<pedido.localidad.length;i++) 
            if (pedido.localidad[i].opcion)
                total+=pedido.localidad[i].precio

    if (pedido.descuentoFecha)
        total*=0.8
    
    if (pedido.descuentoAbundancia)
        total*=0.9

    document.getElementById("cantidad").innerHTML=parseFloat(total).toFixed(2);
}

function registrar(evento) {
    pedido.queso.n=parseInt(quesos.value)
    pedido.hawaii.n=parseInt(hawaii.value)
    pedido.barbacoa.n=parseInt(barbacoa.value)

    pedido.descuentoAbundancia=false
    if (pedido.queso.n+pedido.hawaii.n+pedido.barbacoa.n>3)
        pedido.descuentoAbundancia=true      

    for (let i=1;i<6;i++) 
        pedido.extras[i-1].opcion=document.getElementById(`extra${i}`).checked

    pedido.recargoPago=false
    if (document.formulario.recogida[1].checked) {
        pedido.recargoPago=true    
        let localidad=document.getElementById("localidad");
        for (let i=0;i<pedido.localidad.length;i++) 
            pedido.localidad[i].opcion=false
        pedido.localidad[parseInt(localidad.options[localidad.selectedIndex].value)].opcion=true
    }

    let fechaEnvio=new Date(formulario.fecha.value).getTime();
    let hoy = new Date().getTime();
    let dias = (fechaEnvio - hoy)/(1000*60*60*24);
    pedido.descuentoFecha=false
    if (dias>7)
        pedido.descuentoFecha=true
    console.log(pedido)
    calcularTotal()
}

fieldsets[1].addEventListener("change",registrar)
formulario.localidad.addEventListener("change",registrar)
document.getElementById("enviar").addEventListener('click',enviar)
document.addEventListener('DOMContentLoaded',e=>{
    setDate();
    calcularTotal()
})
