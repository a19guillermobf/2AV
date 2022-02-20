/** Creo que aqui poderia utilizar a opçom esta de seleccionar para o evento
 * um elemento superior, e depois co evento.target seleccionar o que fazer
 * em funço de se se cicka um botom ou outro
 */

/**
 * <main>
      <div class="contenedor">
        <h1>Contador</h1>
        <span id="valor">0</span>
        <div class="button-contenedor">
          <button class="btn decrementar">Decrementar</button>
          <button class="btn reset">Resetear</button>
          <button class="btn incrementar">Incrementar</button>
        </div>
      </div>
    </main>
 */

let valor = document.querySelector("#valor");
let botons = document.querySelectorAll(".btn");
let contentor = document.querySelector(".contenedor");
/** Em funçom do botom que se prema, vai haver que incrementar ou decrementar os 
 * valores do contador e ademais, cambiar-lhe a classe para que cambie de cor
 * cor do zero
 * color: var(--clr-grey-1);
 * cor < 0
 * color: var(--clr-red-dark);
 * cor > 0 
 * color: var(--clr-green-dark);*/

contentor.addEventListener("click",evento=>{
    switch (evento.target){
        case botons[0]:
            console.log("Decrementar");
            valor.textContent = parseInt(valor.textContent)-1;
            break;
        case botons[1]:
            console.log("Resetear");
            valor.textContent = 0;
            break;
        case botons[2]:
            console.log("Incrementar");
            valor.textContent = parseInt(valor.textContent)+1;
            break;
        default:
            console.log("Nom tá furrulando...");
    }
    if (valor.textContent>0){
        valor.style.color = "hsl(125, 67%, 44%)";
    } else if (valor.textContent<0){
        valor.style.color = "hsl(360, 67%, 44%)";
    } else {
        valor.style.color = "hsl(209, 61%, 16%)";
    }

})