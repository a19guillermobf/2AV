# 1. O objeto Form
Aquí imos atopar campos de texto. botons, checkboxes, listas, etc


## 1.1 Formas de selecçom do objeto Form  

Existindo o formulario 

```html
<div  id="menulateral">
     <form  id="contactar" name="contactar" action="...">...</form>
</div>
```

* **Método 1**

```js
let formulario = document.getElementById("contactar");
```

* **Método 2**

```js
let formularios = document.getElementsByTagName("form");
let primerFormulario = formularios[0]; // primeiro formulario do documento
/** Ou co id*/
let menu = document.getElementById("menulateral");
let formularios = menu.getElementsByTagName("form");       // formularios contidos no menu lateral
let primerFormulario =  formularios[0];                     // primer formulario no menú lateral
```

* **Método 3**

```js
let formularios = document.forms;        // a referencia a todos os formularios do documento
let miFormulario = formularios[0];       // primeiro formulario do documento
// Ou bem
let miFormulario = document.forms[0];     // primeiro formulario do documento
// Ou
let miFormulario = formularios["contactar"];       // referenciamos o formulario com name "contactar"
```

* **Método 4**

```js
let formularios = document.querySelector('#contactar') //Selecciona o elemento com esse id
// ou
let formularios = document.querySelector('form') //Selecciona o primeiro dos formularios do DOM
// ou
let formularios = document.querySelector('[name="contactar"]') //Selecciona o primeiro elemento do DOM com esse name
// ou, com querySelectorAll
let formularios = document.querySelectorAll('form') //Crea um nodeList com todos os formularios
// E igual, com querySelectorAll recolhe todos os elementos do dom indicados na condiçom, seja por nome, tag, classe, etc, indicando esta do mesmo jeito que se indica em css.
```

## 1.3 Acceso a propriedades e métodos do formulario

* Propriedades do objeto Form  
  * `acceptCharset` → Ajusta ou devolve o valor deste atributo  
  * `action` → Ajusta ou devolve o valor deste atributo  
  * `enctype` → Ajusta ou devolve o valor deste atributo 
  * `length` → Ajusta ou devolve o valor deste atributo 
  * `method` → Ajusta ou devolve o valor deste atributo 
  * `name` → Ajusta ou devolve o valor deste atributo 
  * `target` → Ajusta ou devolve o valor deste atributo 
* Métodos do objeto Form
  * `reset()` → Resetea um formulário
  * `submit()` → Envía um formulario

**Propriedade** `form.elements[]` → é umha coleçom que contem todos os objetos `input` dentro dum formulario. Esta propriedade é outro array, com todos os campos `input` na orde na cal aparecem no código fonte do documento. Exemplo:

```js
let miFormulario = document.getElementById("contactar");    // guardamos la referencia del formulario en una variable.
if (! miFormulario) return false;        // Si no existe ese formulario devuelve false.
for (let i=0; i< miFormulario.elements.length; i++) {
      if (miFormulario.elements[i].type == "text") {
            miFormulario.elements[i].value = "";
      }
}
```

# 2. Objetos relacionados com formulários

Exemplo:
```html
<form  id="formularioBusqueda"  action="cgi-bin/buscar.pl">
      <p>
            <input  type="text"  id="entrada"  name="cEntrada">
            <input  type="submit"  id="enviar"  name="enviar"  value="Buscar...">
      </p>
</form>
```

As seguintes referencias ao campo de texto serám todas válidas:

```js
document.getElementById("entrada");
document.formularioBusqueda.cEntrada;
document.formularioBusqueda.elements[0];
document.forms["formularioBusqueda"].elements["cEntrada"];
document.forms["formularioBusqueda"].cEntrada;
```

## 2.1 Objeto input de tipo texto

Os 4 elementos de tipo texto dos formularios sm `text`,`password`,`hidden` e `textarea`.
* Propriedades do objeto `input` de tipo texto
  * `defaultValue` → Ajusta ou devolve o valor por defecto de um campo de texto.
  * `form` → Devolve a referencia ao formulario que contem esse campo de texto
  * `maxLength` → Devolve ou ajusta a longitude máxima de caracteres permitidos no campo de tipo texto
  * `name` → Ajusta ou devolve o valor do atributo `name` de um campo de texto
  * `readOnly` → Ajusta ou devolve se um campo é de só lectura ou nom
  * `size` → Ajusta ou devolve o ancho de um campo de texto (em caracteres)
  * `type` → Devolve o tipo de campo de texto
  * `value` → Ajusta ou devolve o contido do atributo `value` de um campo de texto
* Métodos do objeto `input`
  * `select()` → Selecciona o conteúdo de um campo de texto

## 2.2 Objeto input de tipo checkbox

Exemplo 

```html
<label  for="cantidad">Si desea recibir 20 Kg marque esta opción: </label>
<input  type="checkbox" id="cantidad" name="cantidad" value="20 Kg">
```

Neste caso, cando enviamos o formulario enviara-se o par **name/value**, é dizer, cantidade e 20Kg

```html
<!DOCTYPE  html>
<html>
    <head>
        <script type="text/javascript">
            const marcar = () => {
                document.getElementById("verano").checked = true;
            }
            const desmarcar = () => {
                document.getElementById("verano").checked = false;
            }
        </script>
    </head>
    <body>
        <form action="" method="get">
            <label for="verano">¿Te gusta el verano?</label>
            <input type="checkbox" id="verano" name="verano" value="Si"/>
        </form>
        <button onclick="marcar()">Marcar Checkbox</button>
        <button onclick="desmarcar()">Desmarcar Checkbox</button>
    </body>
</html>
```

* Propriedades do objeto `input` de tipo `checkbox`
  * `checked`
  * `defaultChecked`
  * `form`
  * `name`
  * `type`
  * `value`


## 2.3 Objeto input tipo radio

```html
<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="utf-8">
        <title>DWEC05 - Trabajando con objetos input de tipo radio</title>
        <script type="text/javascript">
            const mostrarDatos = () => {
                for  (let i=0;i<document.formulario.actores.length; i++) {
                    if  (document.formulario.actores[i].checked)
                        alert(document.formulario.actores[i].value);
                }
            }
        </script>
    </head>
    <body>
        <h1>Trabajando con objetos input de tipo radio</h1>
        <form  name="formulario" action="stooges.php">
            <fieldset>
                <legend>Selecciona tu actor favorito:</legend>
                <label for="actor1">Willis</label>
                <input type="radio" name="actores" id="actor1"value="Walter Bruce Willis - 19 de Marzo de 1955" checked>
                <label for="actor2">Carrey</label>
                <input type="radio" name="actores" id="actor-2" value="James Eugene Jim Carrey - 17 de Enero de 1962">
                <label for="actor3">Tosar</label>
                <input type="radio" name="actores" id="actor-3" value="Luis Tosar - 13 de Octubre de 1971">
                <input type="button" id="consultar" name="consultar" value="Consultar Más Datos" onclick="mostrarDatos()">
            </fieldset>
        </form>
    </body>
</html>
```

## 2.4 Objeto select

O objeto `select` está composto por umha array de objetos `option`

```html
<!DOCTYPE  html>
<html>
    <head>
        <meta  http-equiv="content-type"  content="text/html;charset=utf-8">
        <title>DWEC05 - Trabajando con un objeto Select</title>
        <script  type="text/javascript">
            const consultar = () => {
                let provincias = document.getElementById("provincias");
                let texto = provincias.options[provincias.selectedIndex].text;
                let valor = provincias.options[provincias.selectedIndex].value;
                alert(`Datos de la opción seleccionada:\n\nTexto: ${texto}\nValor: ${valor}`);
            }
        </script>
    </head>
    <body>
        <h1>Trabajando con un objeto Select</h1>
        <form id="formulario">
            <p>
                <label for="provincias">Seleccione provincia: </label>
                <select name="provincias" id="provincias">
                    <option value="AL">Almería</option>
                    <option value="JA">Jaen</option>
                    <option value="GR">Granada</option>
                    <option value="MA">Málaga</option>
                    <option value="SE">Sevilla</option>
                    <option value="CO">Córdoba</option>
                    <option value="CA">Cádiz</option>
                    <option value="HU">Huelva</option>
                </select>
            </p>
            <p>
                Selecciona una opción y pulsa el botón.
            </p>
            <input type="button" name="boton" value="Consultar información de la opción" onclick="consultar()"/>
        </form>
    </body>
</html>
```
