const productos=[
    {
        "precio": 500,
        "id": 1,
        "title": "Café",
        "thumbnailUrl": "https://picsum.photos/id/0/600"
    },
    {
        "precio": 300,
        "id": 2,
        "title": "Pizza",
        "thumbnailUrl": "https://picsum.photos/id/10/600"
    },
    {
        "precio": 100,
        "id": 3,
        "title": "Agua",
        "thumbnailUrl": "https://picsum.photos/id/20/600"
    },
    {
        "precio": 50,
        "id": 4,
        "title": "Sandía",
        "thumbnailUrl": "https://picsum.photos/id/30/600"
    },
    {
        "precio": 10,
        "id": 5,
        "title": "Mango",
        "thumbnailUrl": "https://picsum.photos/id/40/600"
    },
    {
        "precio": 150,
        "id": 6,
        "title": "Chela",
        "thumbnailUrl": "https://picsum.photos/id/50/600"
    }
]

const listaProductos=document.querySelector("#lista-productos")
const listaCarrito=document.querySelector("#body-carrito")
const totalCarrito=document.querySelector("#footer-carrito")
const tFooterCarrito=document.querySelector("#template-footer-carrito").content

let productosCarrito={}

function renderProductos() {
    const fragmento=document.createDocumentFragment()
    tproducto=document.querySelector("#template-producto").content

    productos.forEach(el=>{
        producto=tproducto.cloneNode(true)
        img=producto.querySelector("img")
        nombre=producto.querySelector(".card-title")
        precio=producto.querySelector(".card-text")
        comprar=producto.querySelector("a")
        comprar.dataset.id=el.id
        img.src=el.thumbnailUrl
        nombre.textContent=el.title
        precio.innerHTML=`${el.precio} &euro;`;
        fragmento.appendChild(producto)
    })
    listaProductos.appendChild(fragmento)
}

function addProducto(e) {
    if (!productosCarrito[e.target.dataset.id]) 
        productosCarrito[e.target.dataset.id]={
            id:e.target.dataset.id,
            precio:productos[e.target.dataset.id-1].precio,
            cantidad:1
        }
    else
        productosCarrito[e.target.dataset.id].cantidad++
    renderCarrito()    
}

function renderCarrito(){   
    document.querySelector("#body-carrito").innerHTML=""
    if (Object.keys(productosCarrito).length!=0) {
    const fragmento=document.createDocumentFragment()
    tProductoCarrito=document.querySelector("#template-producto-carrito").content   
    let i=1
    for (p in productosCarrito) {
        producto=tProductoCarrito.cloneNode(true)
        tds=producto.querySelectorAll("td")
        tds[0].textContent=i++
        tds[1].textContent=productos[p-1].title
        tds[2].textContent=productosCarrito[p].cantidad
        tds[4].innerHTML=`${productos[p-1].precio*productosCarrito[p].cantidad} &euro; `  
        producto.querySelector(".btn-info").dataset.id=productosCarrito[p].id
        producto.querySelector(".btn-danger").dataset.id=productosCarrito[p].id
        fragmento.appendChild(producto)
    }
    document.querySelector("#body-carrito").appendChild(fragmento)
}
    renderTotalCarrito() 
}

function renderTotalCarrito(){
    totalCarrito.innerHTML=""
    if (Object.keys(productosCarrito).length==0)
        totalCarrito.innerHTML='<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>'
    else {
        const nProductos=Object.values(productosCarrito).reduce((acc,{cantidad})=>acc+cantidad,0)
        console.log(Object.values(productosCarrito))
        const nPrecio=Object.values(productosCarrito).reduce((acc,{precio,cantidad})=>acc+cantidad*precio,0)
        tFooterCarrito.querySelectorAll("td")[0].textContent=nProductos
        tFooterCarrito.querySelector("span").textContent=nPrecio

        const clone=tFooterCarrito.cloneNode(true)
        totalCarrito.appendChild(clone)
        const btnVaciar=document.getElementById("vaciar-carrito")
        btnVaciar.addEventListener("click",()=>{
            productosCarrito={}
            renderCarrito()
        })
    }
} 

document.addEventListener('DOMContentLoaded',renderProductos)

listaProductos.addEventListener('click', e=>{
    e.stopPropagation()
    if (e.target.classList.contains("btn-dark"))
        addProducto(e)
})

listaCarrito.addEventListener('click',e=>{
    e.stopPropagation()
    if (e.target.classList.contains("btn-info")) {
        productosCarrito[e.target.dataset.id].cantidad++
        renderCarrito()
    }
    if (e.target.classList.contains("btn-danger")) {
        productosCarrito[e.target.dataset.id].cantidad--
        if (!productosCarrito[e.target.dataset.id].cantidad)
            delete productosCarrito[e.target.dataset.id]
        renderCarrito()
    }
})