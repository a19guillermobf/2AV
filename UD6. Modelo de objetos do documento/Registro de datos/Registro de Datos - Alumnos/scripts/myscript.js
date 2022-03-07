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