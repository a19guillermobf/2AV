// Datos del Personal
const personal = [
  {
    id: 1,
    nombre: "Ana Lopez",
    trabajo: "Desarrolladora Web",
    foto:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg",
    text:
      "I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry",
  },
  {
    id: 2,
    nombre: "Rosa Martinez",
    trabajo: "Desarrolladora Web",
    foto:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883409/person-2_np9x5l.jpg",
    text:
      "Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal.",
  },
  {
    id: 3,
    nombre: "Pedro Rodriguez",
    trabajo: "Becario",
    foto:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg",
    text:
      "Sriracha literally flexitarian irony, vape marfa unicorn. Glossier tattooed 8-bit, fixie waistcoat offal activated charcoal slow-carb marfa hell of pabst raclette post-ironic jianbing swag.",
  },
  {
    id: 4,
    nombre: "Julian Leiros",
    trabajo: "El Jefe",
    foto:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883423/person-4_t9nxjt.jpg",
    text:
      "Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. ",
  },
];

/**Suponho que haverá que recolher os campos que hai que modificar
 * engadir um listener para os botons de adiante e atrás.
 * Se é o primeiro ou o último haverá que passa o último ou o primeiro
 * 
 * No de sorprende-me haverá que escolher um número aleatorio entre o 1 e o 4
 * Igual se pode usar igualmente o de event.target para crear um só addeventlistener
 * 
 * Espera-te aí, porque os datos que estam no html nom estam neste array de datos. 
 * Dalgúm jeito haverá que incluir a esta pessoa no array, pero só se é a primeira vez
 */
let nome = document.querySelector("#nombre")
let trabalho = document.querySelector("#trabajo")
let foto = document.querySelector("#persona-img")
let texto = document.querySelector("#info")
let contentor = document.querySelector("main")

/**Esta funçom está mal, hai que fazer objetos, coma no exercicio dos livros
 * nom um array.
 * Igual hai que fazer um evento ou algo que recolha e esta sara nada mais carregar
 * a página
 */
function actualizaPersonal(){
  if (!personal[4]){
    let sara = {
      id: 5,
      nombre: nome.textContent,
      trabajo: trabalho.textContent,
      foto: foto.src,
      text: texto.textContent
    }
    personal.push(sara);
  }
}

/**Actualiza o html co empregado localizado na possiçom n */
function actualizaHTML(n){
  nome.textContent = personal[n].nombre;
  trabalho.textContent = personal[n].trabajo;
  foto.src = personal[n].foto;
  texto.textContent = personal[n].text;
}

contentor.addEventListener("click",evento=>{
  evento.preventDefault()
  actualizaPersonal()
  let actual
  /**Recolhe o id do actual empregado */
  personal.forEach(elemento => {
    if(elemento.nombre == nome.textContent){
      actual = parseInt(elemento.id);
    }
  });
  /** Escolhe o que fazer em funçom do botom que se prema, 
   * no switch recolhe o evento, e nos case vai comprovando se se 
   * corresponde com avançar, retroceder ou aleatorio
   */
  switch(evento.target){
    /**Retroceso */
    case document.querySelectorAll("i")[0]:
      /**Se o id actual é igual a 1, temos que ir ao último da lista
       * Para isso colhemos a longitude e sumamos 1
       */
      if(actual == 1){
        actual = personal.length+1;
      }
      /**Porque para retroceder 1, temos que ir ao número do id actual
       * menos 2, para ir do id 3 ao 2, temos que ir a personal[1]
       */
       actualizaHTML(actual-2);
      break;
    /**Avanço */
    case document.querySelectorAll("i")[1]:
      /**Se o id actual é o do último, temos que ir ao primeiro da lista */
      if (actual == personal.length){
        actual = 0
      }
      actualizaHTML(actual)
      break;
    /**Aleatorio 
     * Asigna a actual um número entre 0 e 4
     * Math.floor((Math.random() * (max - min + 1)) + min);
    */
    case document.querySelectorAll("button")[2]:
      actual = Math.floor((Math.random() * 5));
      actualizaHTML(actual);
      break;
    default:
      console.log("Click fora dos elementos de acçom")
  }
})
