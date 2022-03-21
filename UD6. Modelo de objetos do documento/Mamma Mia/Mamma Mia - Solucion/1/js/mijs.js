var total=0;

const formulario=document.querySelector("form")
const fieldsets=document.querySelectorAll("fieldset")

const quesos=formulario.quesos;
const hawaii=formulario.hawaii;
const barbacoa=formulario.barbacoa;

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

function pizzas() {
    let nquesos=parseInt(quesos.value);
    let nhawaii=parseInt(hawaii.value);
    let nbarbacoa=parseInt(barbacoa.value);

    total=parseFloat(5*nquesos+7*nhawaii+5*nbarbacoa)
    extras()
}

function extras() {
    if (total==0) {
        for (let i=1;i<6;i++) 
            document.getElementById(`extra${i}`).checked=false 
    } else {
       for (let i=1;i<6;i++) 
          if (document.getElementById(`extra${i}`).checked) 
             total=parseFloat(total)+1
       document.getElementById("cantidad").innerHTML=total;
    }
}

function fechaEntrega() {
    let fechaEnvio=new Date(formulario.fecha.value).getTime();
    let hoy = new Date().getTime();

    let dias = (fechaEnvio - hoy)/(1000*60*60*24);
    
    if (dias>7)
       total=0.8*parseFloat(total)
}

function recogida() {
    if (total==0) {
        document.formulario.recogida[0].checked=true
        document.formulario.recogida[1].checked=false
    } else
    if (document.formulario.recogida[1].checked)
        localidad()
}

function localidad() {
    if (total!=0) {
        let localidad=document.getElementById("localidad");
        switch (parseInt(localidad.options[localidad.selectedIndex].value)) {
            case 0: break
            case 1: total=parseFloat(total)+1
                     break
            case 2: total=parseFloat(total)+1
                    break
            case 3: total=parseFloat(total)+2
        }
        } else {
            localidad.selectedIndex=0;
        }   
}

function descuento(){
    let nquesos=parseInt(quesos.value);
    let nhawaii=parseInt(hawaii.value);
    let nbarbacoa=parseInt(barbacoa.value);

    if (nquesos+nhawaii+nbarbacoa>3) 
        total=(0.9*total).toFixed(2)
}

function calcular(evento) {
    pizzas()
    recogida()
    fechaEntrega()
    descuento()

    if (total==0)    
        document.getElementById("cantidad").innerHTML="0.00"
    else 
        document.getElementById("cantidad").innerHTML=parseFloat(total).toFixed(2);
}

fieldsets[1].addEventListener("change",calcular)
formulario.localidad.addEventListener("change",calcular)
document.getElementById("enviar").addEventListener('click',enviar)
document.addEventListener('DOMContentLoaded',e=>{
    setDate();
    calcular()
})
