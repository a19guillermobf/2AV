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
    constructor(nif,nome,sexo,enderezo,data,estudos,telefone,mail,hobis,outra){
        this.nif = nif;
        this.nome = nome;
        this.sexo = sexo;
        this.enderezo = enderezo;
        this.data = data;
        this.estudos = estudos;
        this.telefone = telefone;
        this.mail = mail;
        this.hobis = hobis;
        this.outra = outra;
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
    get outra(){
        return this.outra;
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
    set outra(outra){
        this.outra = outra;
    }
}

/**Cambio de tercio por sugerencia de Julian, a parte que ia fazer com isto
 * melhor faze-la primeiro com um arrai onde ir gardando as classes e 
 * funçons pa ir fazendo as cousas.*/
let alunos = [];
let formulario = document.querySelector("form");
/**Recolhe os elementos que hai no HTML */
let nif = document.querySelector("#nif");
let nome = document.querySelector("#nombre");
/**Este vai revisar se o sexo Home está marcado, se está colhe o valor desse elemento, se nom colhe o de mulher
 * Haveria que se assegurar de que cando se chama a esta funçom todos os campos estám cubertos,
 * ainda que polo que se ve no vídeo, nalgúm momento hai que fazer que Hombre esteja marcado por defecto
 */
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

/**A plantilha HTML que me vai cumprir depois para pintar a táboa 
 * co content devolve um nodo DocumentFragment, que
* depois poderemos copiar com cloneNode e assi aplicar as 
* funçons de querySelector e demais, coma se fora o objeto document do DOM
*/
let modelo = document.querySelector("#template-fila").content
/**Recolhe o tbody, pa depois pintar a tábua, como só hai um 
 * vai com queryselector
 */
let tbody = document.querySelector("tbody");

/**Resetea formulario e asigna os valores que tem que ter 
 * Em primeiro lugar, tem que borrar todos os textbox
 * tem que por a disabled todos os campos excepto o do nif
 * Tem que seleccionar Hombre e Sin estudios, e desseleccionar todos os de aficiones
 */

function reseteaFormulario(){
    formulario[1].disabled = false;
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
    /**Crea um fragmento onde vai ir gardando os datos */
    let fragmento = document.createDocumentFragment();
    /**Agora vou ir percorrendo um a um todas as instancias de aluno que existam, se é que existem */
    alunos.forEach(aluno=>{
        /**LEMBRA cando se chama a um getter nom se lhe pom o paréntese */
        /**Clono a plantilha que tinha recolhida */
        let modeloaluno = modelo.cloneNode(true);
        /**Recolho todos os td dentro desta plantilha */
        let tds = modeloaluno.querySelectorAll("td");
        /**Vou mentendo os datos */
        tds[0].textContent = aluno.nif;
        tds[1].textContent = aluno.nome;
        /**Para o sexo, garda-se true ou false em funçom de se é home ou nom
         * daquela, com um condicional ternario pinto H ou M
         */
        tds[2].textContent = aluno.sexo ? "H" : "M";
        tds[3].textContent = aluno.enderezo;
        tds[4].textContent = aluno.data;
        /**Em estudos tenho gardado um número do 0 ao 5, em funçom do número ponho o string
         * fago um switch case para isto
        */
        let estudos;
        switch(aluno.estudos){
            case 0: estudos = "Sin estudios";
            break;
            case 1: estudos = "ESO";
            break;
            case 2: estudos = "Bachillerato";
            break;
            case 3: estudos = "CM FP";
            break;
            case 4: estudos = "CS FP";
            break;
            case 5: estudos = "Universidad";
            break;
        }
        tds[5].textContent = estudos;
        tds[6].textContent = aluno.telefone;
        tds[7].textContent = aluno.mail;
        /**Aqui, em tds8 hai que meter as afiçons e o que esteja em otra, se é que
         * hai algo
         * Hobis vai ser um array sempre, ainda que nom tenha nada, entom creo um array
         * temporal onde vou ir metendo os valores se os hai
         */
        let aficons = [];
        aluno.hobis.forEach(elemento=>{
            aficons.push(elemento);
        })
        /**E agora se aluno.outra nom está valeiro, tamém o meto no array temporal
         * e remato metendo com join, os valores separados por ;
         */
        if(aluno.outra != ""){
            aficons.push(aluno.outra)
        }
        tds[8].textContent = aficons.join(";");
        /**Em tds 9 hai que fazer o truque de recolher o datatarget, bué, de meter o datatarget mais bem
         * que pode ser o nif mesmamente.
         * Este td tem um a dentro polo que podo recolhe-lo com queryselector(a)
         */
        let a = tds[9].querySelector("a");
        a.dataset.id = aluno.nif;
        tds[9]
        /**Por último engade este aluno ao fragmento que temos gardado */
        fragmento.appendChild(modeloaluno)
    });
    /**No final temos que recolher a longitude do array de alunos
     * e atualizar o apartado "Total de Registros".
     * Tamém, borrar o contido do tbody anterior e meter no sítio
     * este fragmento
     */
    let totalregistros = alunos.length;
    document.querySelector("tfoot").querySelectorAll("th")[1].innerHTML = totalregistros;
    tbody.innerHTML="";
    tbody.appendChild(fragmento);

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
    const novoaluno = new Aluno(nif.value,sexo[0].checked,enderezo.value,data.value,estudos.value,telefone.value,mail.value,hobbies,outra[0].value)
    alunos.push(novoaluno);
}

function verificaDados(){}

/**Imos cos eventos. Cando carregue a página tem que lançar o 
 * script de resetear o formulario
*/
document.addEventListener("DOMContentLoaded", evento =>{
    evento.preventDefault();
    reseteaFormulario();
    /**Tamém, se hai datos em sessom gardados recupera-os */
    recuperaDatosSessom();
})

/**No nif, hai que fazer várias cousas, mete-se o NIF
 * cando saia desse campo, evento blur, verifica
 * Se o formato de DNI é correto, se é correto comprova
 * Se esse nif existe na estrutura de datos, 
 *      se existe, carga os datos desse aluno no formulario
 * Desbloquea o resto dos campos e bloquea o do DNI
 * Se nom existe, nom bloquea o campo do DNI
 */
function verificaNIF(nif){
    let letra = ["T","R","W","A","G","M","Y","F","P","D","X","B","N","J","Z","S","Q","V","H","L","C","K","E"];
    // let expressom = /o que seja/
    let expressom = new RegExp('^[0-9]{8}-?([A-Z]|[a-z])$');
    if(expressom.test(nif)){
        let control = parseInt(nif.substring(0,8))%23;
        if(letra[control] == nif.substring(nif.length-1)){
            return true;
        }
        return false;
    }
    return false;
}
function existeNIF(nif){
    alunos.forEach(aluno=>{
        if (aluno.nif == nif){
            return true;
        };
    })
    return false;
}
function cargaFormularioAlunoExistente(nif){
    alunos.forEach(aluno=>{
        if (aluno.nif == nif){
            nome.value=aluno.nome;
            /**Em sexo gardei true se estava selecionado home e false se nom
             * Agora asigno o checked em funçom disso
             */
            aluno.sexo ? sexo[0].checked = true : sexo[1].checked = true;
            enderezo.value=aluno.enderezo;
            data.value=aluno.data;
            estudos.value=aluno.estudos;
            telefone.value=aluno.telefone;
            mail.value=aluno.mail;
            /**Agora para as afiçons... */
        }; 
    })
}
nif.addEventListener("blur",evento=>{
    /**Se o DNI é correto trabalha, se nom nom fai nada */
    if(verificaNIF(nif)){
        /**Verifica se existe na estrutura de datos, se existe
         * saca um alert informando
         * carga os datos e desabilita o campo do nif
        */
        if(existeNIF(nif)){
            alert("Carregam-se os dados existentes");
            cargaFormularioAlunoExistente(nif);
            formulario[1].disabled = true;
        }
        /**Habilita o resto dos campos*/
        for (let i = 2; i < formulario.length-1; i++){
            formulario[i].disabled = false;
        }
    }
})