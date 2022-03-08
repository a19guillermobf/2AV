/**Parece que de primeiras tem que estar só activado o campo do nif, e se este é correto (verificaçom por regexp?) habilita o resto dos campos para 
 * crear ou editar.
 * Cando se introduce um nif, verifica se existe numha estrutura de dados que teremos que crear para gardar o que se vai metendo.
 * Se existe carga os datos no formulario, e avisa com um alert de que se carregarom
 * Se nom, habilita o formulario para ediçom
 * Polo que parece no video, o evento que executa a comprovaçom do nif é cando esse campo perde o foco
 * 
 * Logo, vai creando na parte de abaixo umha táboa igual que no exercicio dos livros, com um botom pa
 * borrar a entrada e na última fila, o número total de registros gardados
 * 
 * Chaves, crear fragmentos para ir creando a tábua tanto cando se engade coma cando se borra algo nos datos
 * Engadir um dataset no botom de borrar de cada entrada na tábua, por exemplo co DNI, que sirva pa relacionar o que hai na tábua co que temos na estrutura de datos
 * Crear umha classe que sirva para gardar os datos, cos seus setters e getters, e logo ir gardando instancias dessa classe??
 * Crear umha classe Interface que tenha os métodos pa engadir ou borrar alunas, pa actualizar os datos da session?? 
 * Polo que apuntei na outra tarefa, esta classe teria estes métodos e ademais teria internamente a estrutura de datos 
 */

 class Aluno{
    //Construtor ao que se lhe passam todos os campos
    constructor(nif,nome,sexo,enderezo,data,estudos,telefone,mail,hobis){
        this.nif = nif;
        this.nome = nome;
        this.sexo = sexo;
        this.enderezo = enderezo;
        this.data = data;
        this.estudos = estudos;
        this.telefone = telefone;
        this.mail = mail;
        this.hobis = hobis;
    }
    //Getters
    get nif(){
        return this.nif;
    }
    get nome(){
        return this.nome;
    }
    get sexo(){
        return this.sexo;
    }
    get enderezo(){
        return this.enderezo;
    }
    get data(){
        return this.data;
    }
    get estudos(){
        return this.estudos;
    }
    get telefone(){
        return this.telefone;
    }
    get mail(){
        return this.mail;
    }
    get hobis(){
        return this.hobis;
    }
    //Setters
    /**Aqui entendo que já nom é só asignar valores sem mais, suponho que o nif nom se vai 
     * poder cambiar mais, polo que já nom lhe fago setter.
     * Logo, o campo hobis por exemplo, entendo que é um array de strings ou algo assi, 
     * polo que teria que actualizar com um novo array, ainda que se o que recolho do html é
     * já umha estrutura assi... igual si que pode ser umha simples assignaçom... vou vendo
     */
    set nome(nome){
        this.nome = nome;
    }
    set sexo(sexo){
        this.sexo = sexo;
    }
    set enderezo(enderezo){
        this.enderezo = enderezo;
    }
    set data(data){
        this.data = data;
    }
    set estudos(estudos){
        this.estudos = estudos;
    }
    set telefone(telefone){
        this.telefone = telefone;
    }
    set mail(mail){
        this.mail = mail;
    }
    set hobis(hobis){
        this.hobis = hobis;
    }
}

/**Cambio de tercio por sugerencia de Julian, a parte que ia fazer com isto
 * melhor faze-la primeiro com um arrai onde ir gardando as classes e 
 * funçons pa ir fazendo as cousas.
 */
let alunos = [];
let formulario = document.querySelector("form");
/**Recolhe os elementos que hai no HTML 
*/
    /**Recolhe um string */
    let nif = document.querySelector("#nif");
    /**Recolhe um string */
    let nome = document.querySelector("#nombre");
    /**Este vai revisar se o sexo Home está marcado, se está colhe o valor desse elemento, se nom colhe o de mulher
     * Haveria que se assegurar de que cando se chama a esta funçom todos os campos estám cubertos,
     * ainda que polo que se ve no vídeo, nalgúm momento hai que fazer que Hombre esteja marcado por defecto
     */
    //let sexo = document.getElementsByName("sexo")[0].checked ? document.getElementsByName("sexo")[0].value : document.getElementsByName("sexo")[1].value;
    let sexo = document.getElementsByName("sexo")
    /**Recolhe um string */
    let enderezo = document.querySelector("#direccion");
    /** Recolhe a data de nacemento */
    let data = document.querySelector("#fnac");
    /**Recolhe um valor do 0 ao 5, depois entendo que haveria que relacionar co string correspondente
     * com por exemplo document.querySelectorAll("option")[3].textContent, sendo 3 o número que recolhemos em estudo
     */
    let estudos = document.querySelector("#estudios");
    /**String ou int */
    let telefone = document.querySelector("#telefono");
    /**String */
    let mail = document.querySelector("#email");
    /**Agora, para os checkbox, com document.querySelectorAll('input[type="checkbox"]') ou com document.getElementsByName("aficion")
     *  seleccionam-se os tres, haveria que ver quais som os 
     * checked. Tamém haveria que ver se "Otra" tem algum contido.
     * Estes valores haveria que garda-los numha estrutura de datos, por exemplo um array ou assi
     * Entom, igual podo crear umha variável pa recolher os checkbox, e logo a variável hobis, array onde ir metendo os que correspondam
     */
    let aficions = document.getElementsByName("aficion");
    let outra = document.getElementsByName("otra");


/**Resetea formulario e asigna os valores que tem que ter 
 * Em primeiro lugar, tem que borrar todos os textbox
 * tem que por a disabled todos os campos excepto o do nif
 * Tem que seleccionar Hombre e Sin estudios, e desseleccionar todos os de aficiones
 */

function reseteaFormulario(){
    for (let i = 2; i < formulario.length-1; i++){
        formulario[i].disabled = true
    }
    nif.value="";
    nome.value="";
    sexo[0].checked=true;
    enderezo.value="";
    estudos.value=0;
    telefone.value="";
    mail.value="";
    outra.value="";
    aficions.forEach(elemento =>{
        elemento.checked=false;
    })
}

/**Garda o array de alunos em sessom */
function gardaDatosSessom(){
    sessionStorage.setItem("alunos",JSON.stringify(alunos))
}

/**Recupera os datos de alunos gardados em sessom 
 * e crea o array alunos */
function recuperaDatosSessom(){
    /**Se os datos estam gardados recupera-os */
    if(sessionStorage.getItem("alunos")){
        /**Com este parse converte a cadea de texto que tinhamos gardada
         * à estrutura de datos JSON ca que trabalhamos
         */
        alunos = JSON.parse(sessionStorage.getItem("alunos"))
    }
}

/**"Pinta" a tábua HTML cos datos gardados no array alunos */
function pintaTabua(){

}

/**Engade um aluno à estrutura de datos */
function engadeAluno(){
    /**No campo de sexo, gardo se Hombre está selecionado ou nom 
     * Depois à hora de recuperar, se é true marca-se este como chkecked true
     * e se é false marcase Mujer como checked true
    */
   /**No campo de hobis, terei que gardar os valores de cada label
    * que é o seguinte irmao. Tamém haverá que gardar o valor de Otra
    * A dúvida é, se o gardo todo junto, depois para recupera-lo é umha liada,
    * Igual nom está demais gardar o de Otra aparte e à hora de pintar a tabla,
    * meter estes contidos juntos
   */
   let hobbies = [];
    aficions.forEach(elemento => {
        if (elemento.checked){
            hobbies.push(elemento.nextSibling.textContent);
        }
    });
    if (document.getElementsByName("otra")[0].value != "" ){
        hobis.push(document.getElementsByName("otra")[0].value)
    }
    const novoaluno = new Aluno(nif.value,sexo[0].checked,enderezo.value,data.value,estudos.value,telefone.value,mail.value,hobis)
    alunos.push(novoaluno);
}

/** 
    actualizaDatos(){

    }
    actualizaHTML(){

    }
    reseteaFormulario(){

    }

*/