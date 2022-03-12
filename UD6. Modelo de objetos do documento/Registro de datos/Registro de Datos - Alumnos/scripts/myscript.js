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

/**Nom conseguim trabalhar bem cos getters e os setters, ou mais bem cos setters, se nom ponhia o setter de nif
 * dava-me erro de que havia um getter sem um setter, e se lho ponhia, dava-me um erro de recursividade que nom
 * fum quem de identificar.
 * Tal e como quedou, igual nom tem moito sentido trabalhar com classes deste jeito. Igual era melhor fazer coma 
 * no exercicio de livros.
 */
 class Aluno{
    //Construtor ao que se lhe passam todos os campos
    constructor(nif,nome,sexo,enderezo,data,estudos,telefone,mail,hobis,outra){
        this._nif = nif;
        this._nome = nome;
        this._sexo = sexo;
        this._enderezo = enderezo;
        this._data = data;
        this._estudos = estudos;
        this._telefone = telefone;
        this._mail = mail;
        this._hobis = hobis;
        this._outra = outra;
    }
    //Getters
    /*get nif(){
        return this._nif;
    }
    get nome(){
        return this._nome;
    }
    get sexo(){
        return this._sexo;
    }
    get enderezo(){
        return this._enderezo;
    }
    get data(){
        return this._data;
    }
    get estudos(){
        return this._estudos;
    }
    get telefone(){
        return this._telefone;
    }
    get mail(){
        return this._mail;
    }
    get hobis(){
        return this._hobis;
    }
    get outra(){
        return this._outra;
    }*/
    //Setters
    /**Aqui entendo que já nom é só asignar valores sem mais, suponho que o nif nom se vai 
     * poder cambiar mais, polo que já nom lhe fago setter.
     * Logo, o campo hobis por exemplo, entendo que é um array de strings ou algo assi, 
     * polo que teria que actualizar com um novo array, ainda que se o que recolho do html é
     * já umha estrutura assi... igual si que pode ser umha simples assignaçom... vou vendo
     */
    /*set nif(nif){
        this._nif = nif;
    }
    set nome(nome){
        this._nome = nome;
    }
    set sexo(sexo){
        this._sexo = sexo;
    }
    set enderezo(enderezo){
        this._enderezo = enderezo;
    }
    set data(data){
        this._data = data;
    }
    set estudos(estudos){
        this._estudos = estudos;
    }
    set telefone(telefone){
        this._telefone = telefone;
    }
    set mail(mail){
        this._mail = mail;
    }
    set hobis(hobis){
        this._hobis = hobis;
    }
    set outra(outra){
        this._outra = outra;
    }*/
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
    for (let i = 2; i < formulario.length; i++){
        formulario[i].disabled = true
    }
    nif.value="";
    nome.value="";
    sexo[0].checked=true;
    enderezo.value="";
    estudos.value=0;
    telefone.value="";
    mail.value="";
    outra[0].value="";
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
        tds[0].textContent = aluno._nif;
        tds[1].textContent = aluno._nome;
        /**Para o sexo, garda-se true ou false em funçom de se é home ou nom
         * daquela, com um condicional ternario pinto H ou M
         */
        tds[2].textContent = aluno._sexo ? "H" : "M";
        tds[3].textContent = aluno._enderezo;
        tds[4].textContent = aluno._data;
        /**Em estudos tenho gardado um número do 0 ao 5, em funçom do número ponho o string
         * fago um switch case para isto
        */
        let estudos;
        switch(aluno._estudos){
            case "0": estudos = "Sin estudios";
            break;
            case "1": estudos = "ESO";
            break;
            case "2": estudos = "Bachillerato";
            break;
            case "3": estudos = "CM FP";
            break;
            case "4": estudos = "CS FP";
            break;
            case "5": estudos = "Universidad";
            break;
            default: estudos = "Nom vai";
        }
        tds[5].textContent = estudos;
        tds[6].textContent = aluno._telefone;
        tds[7].textContent = aluno._mail;
        /**Aqui, em tds8 hai que meter as afiçons e o que esteja em otra, se é que
         * hai algo
         * Hobis vai ser um array sempre, ainda que nom tenha nada, entom creo um array
         * temporal onde vou ir metendo os valores se os hai
         */
        let aficons = [];
        aluno._hobis.forEach(elemento=>{
            aficons.push(elemento);
        })
        /**E agora se aluno.outra nom está valeiro, tamém o meto no array temporal
         * e remato metendo com join, os valores separados por ;
         */
        if(aluno._outra != ""){
            aficons.push(aluno._outra)
        }
        tds[8].textContent = aficons.join(";");
        /**Em tds 9 hai que fazer o truque de recolher o datatarget, bué, de meter o datatarget mais bem
         * que pode ser o nif mesmamente.
         * Este td tem um a dentro polo que podo recolhe-lo com queryselector(a)
         */
        let a = tds[9].querySelector("a");
        a.dataset.id = aluno._nif;
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
    //const novoaluno = new Aluno(nif.value,nome.value,sexo[0].checked,enderezo.value,data.value,estudos.value,telefone.value,mail.value,hobbies,outra[0].value)
    alunos.push(new Aluno(nif.value,nome.value,sexo[0].checked,enderezo.value,data.value,estudos.value,telefone.value,mail.value,hobbies,outra[0].value));
}
function modificaAluno(aluno,nome,sexo,enderezo,data,estudos,telefone,mail,aficions,outra){
    /*aluno.nome(nome);
    aluno.sexo(sexo);
    aluno.enderezo(enderezo);
    aluno.data(data);
    aluno.estudos(estudos);
    aluno.telefone(telefone);
    aluno.mail(mail);
    aluno.aficions(aficions);
    aluno.outra(outra);*/
    aluno._nome=nome;
    aluno._sexo=sexo;
    aluno._enderezo=enderezo;
    aluno._data=data;
    aluno._estudos=estudos;
    aluno._telefone=telefone;
    aluno._mail=mail;
    aluno._hobis=aficions;
    aluno._outra=outra;
}

/**Esta funçom vai verificar se estám preenchidos os campos Nome, endereço,
 * telefone e mail. Se algum deles nom está devolve false, e se o telefone
 * nom cumpre ca regExp correspondente tamém devolve false, o mail já está controlado por html
 * se nom devolve true
 */
function verificaDados(){
    let tel = new RegExp('^[6-9][0-9]{8}$')
    if(nome.value=="" || enderezo.value=="" || telefone.value=="" || mail.value==""){
        alert("Faltam dados pessoais por cubrir");
        return false;
    } else if(!tel.test(telefone.value)){
        alert("O número de telefone introduzido nom é correto")
        return false;
    }
    return true;
}

/**Imos cos eventos. Cando carregue a página tem que lançar o 
 * script de resetear o formulario
*/
document.addEventListener("DOMContentLoaded", evento =>{
    evento.preventDefault();
    reseteaFormulario();
    /**Tamém, se hai datos em sessom gardados recupera-os */
    recuperaDatosSessom();
    /**E pinta a tábua */
    pintaTabua();
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
    let existe = false
    alunos.forEach(aluno=>{
        if (aluno._nif == nif){
            existe = true;
        }
    })
    return existe;
}
function cargaFormularioAlunoExistente(nif){
    alunos.forEach(aluno=>{
        if (aluno._nif == nif){
            nome.value=aluno._nome;
            /**Em sexo gardei true se estava selecionado home e false se nom
             * Agora asigno o checked em funçom disso
             */
            aluno._sexo ? sexo[0].checked = true : sexo[1].checked = true;
            enderezo.value=aluno._enderezo;
            data.value=aluno._data;
            estudos.value=aluno._estudos;
            telefone.value=aluno._telefone;
            mail.value=aluno._mail;
            /**Agora para as afiçons, está gardado o texto do label associado, entom
             * podo percorrer, as afiçons do aluno, e com um switch case, marcar as
             * coincidencias
             * aficions.forEach(elemento => {
                if (elemento.checked){
                    hobbies.push(elemento.nextSibling.textContent);
                }
                });
            */
           aluno._hobis.forEach(aficion=>{
               switch(aficion){
                   case "Cine": aficions[0].checked = true;
                   break;
                   case "Lectura": aficions[1].checked = true;
                   break;
                   case "Deporte": aficions[2].checked = true;
                   break;
               }
           })
           outra[0].value = aluno._outra;
        }
    })
}

nif.addEventListener("blur",evento=>{
    /**Se o DNI é correto trabalha, se nom nom fai nada */
    if(verificaNIF(nif.value)){
        /**Verifica se existe na estrutura de datos, se existe
         * saca um alert informando
         * carga os datos e desabilita o campo do nif
        */
        if(existeNIF(nif.value)){
            alert("Carregam-se os dados existentes");
            cargaFormularioAlunoExistente(nif.value);
        }
        formulario[1].disabled=true;
        /**Habilita o resto dos campos*/
        for (let i = 2; i < formulario.length; i++){
            formulario[i].disabled = false;
        }
    }
})

/**Evento submit. Tera que comprovar que:
 * Estam cubertos todos os campos e os datos som corretos, daquela continua e mira se
 *      Se o dni exite na estrutura de dados ou nom
 *          Se existe, actualiza esse aluno na estrutura de dados
 *          Se nom existe crea um aluno novo e engade-o à estrutura de datos
 * Garda a estrutura de datos para a sessom e pinta a tábua 
 */
formulario.addEventListener("submit",evento=>{
    evento.preventDefault();
    if(verificaDados()){
        if(existeNIF(nif.value)){
            alunos.forEach(aluno=>{
                if(aluno._nif==nif.value){
                    let hobbies = [];
                    aficions.forEach(elemento => {
                        if (elemento.checked){
                            hobbies.push(elemento.nextSibling.textContent);
                        }
                    });
                    modificaAluno(aluno,nome.value,sexo[0].checked,enderezo.value,data.value,estudos.value,telefone.value,mail.value,hobbies,outra[0].value);
                }
            })
        } else {
            engadeAluno();
            /**ESTA FALHANDO AO ENGADIR ALUNO NOVO HAI PROBLEMAS CO NIF*/
        }
    }
    pintaTabua();
    gardaDatosSessom();
    reseteaFormulario();
})

/**E agora queda a parte de eliminar entradas, com um evento de click sobre o a tábua
 * e que recolha o data-id do elemento para saber se o tem que borrar
 */
tbody.addEventListener("click",evento=>{
    evento.preventDefault();
    /** Agora, o detalhe que che esquece, comprovar se o elemento clickado tem um datatarget id, se o tem
     * fazemos cousas, se nom nada
     */
    if(evento.target.dataset.id){
        /**No foreach, a funçom de callback tem o elemento co que se está
         * trabalhando em cada volta, o indice, e poderia-se-lhe passar outro
         * array, que agora nom compre
         */
         alunos.forEach((aluno,indice) => {
            /**Entom, ca funçom splice, se lhe passamos o índice
             * e o número de elementos a borrar borra-se esse elemento
             * em concreto.
             * Tal e como apuntava na tarefa dos livros
             * Juliam busca o indice com libros.findIndex(el=>el.id==evento.target.dataset.id)
             * que parece bastante mais elegante e eficiente
             */
            if(aluno._nif == evento.target.dataset.id){
                alunos.splice(indice,1);
            }
        });
    }
    /**Actualiza os dados da sessom e repinta a tábua*/
    gardaDatosSessom();
    pintaTabua();
    reseteaFormulario();
})