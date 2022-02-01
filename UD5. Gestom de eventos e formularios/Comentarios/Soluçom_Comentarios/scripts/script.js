document.addEventListener("DOMContentLoaded",eventoDoc=>{
    const formulario=document.querySelector("form")
    const textArea=document.querySelector("#textArea")
    const elecciones=document.getElementsByName("nodeAction")
    const select=document.querySelector("select")
    const comentarios=document.querySelector("#comentarios")
    const templateComentario=document.querySelector("#template-comentario").content
    
    seleccionados=[]
    
    const renderComentarios=()=>{
        comentarios.innerHTML=""
        const fragmentoComentarios=document.createDocumentFragment()
        comments.forEach((comment,indice)=>{
            const article=templateComentario.cloneNode(true)
            h4=article.querySelector("h4")
            h4.innerHTML=`Comentario ${indice+1}`
            h4.setAttribute("data-id",comment.id)
            p=article.querySelector("p")
            p.textContent=comment.texto
            p.setAttribute("data-id",comment.id)
            if (comment.estado) {
                h4.classList.add("seleccionado")
                p.classList.add("seleccionado")
            }
            else {
                h4.classList.remove("seleccionado")
                p.classList.remove("seleccionado")
            }
    
            fragmentoComentarios.appendChild(article)
        })
        comentarios.appendChild(fragmentoComentarios)
        localStorage.setItem("comments",JSON.stringify(comments))
        formulario.reset()
        textArea.focus()
    }
    
    const actualizarOpciones=(opcion)=>{
        if (opcion) {
            opcionCtrl=document.createElement("option")
            opcionCtrl.textContent=comments.length
            select.appendChild(opcionCtrl)
        } else {
            if (select.lastChild)
                select.lastChild.remove()
        }
    }
    
    const addComentario=()=>{
        comment={
            id:new Date().getTime(),
            estado:false,
            texto:textArea.value
        }
        comments.push(comment)
        actualizarOpciones(true)
        renderComentarios()
    }
    
    const deleteComentario=()=>{
        const indice=select.selectedIndex
        comments.splice(indice,1)
        actualizarOpciones(false)
        renderComentarios()
    }
    
    const insertComentario=()=>{
        const indice=select.selectedIndex
        comment={
            id:new Date().getTime(),
            estado:false,
            texto:textArea.value
        }
        comments.splice(indice,0,comment)
        actualizarOpciones(true)
        renderComentarios()
    }
    
    const replaceComentario=()=>{
        const indice=select.selectedIndex
        comment={
            id:new Date().getTime(),
            estado:false,
            texto:textArea.value
        }
        comments[indice]=comment
        renderComentarios()
    }
    
    formulario.addEventListener("submit",evento=>{
        evento.preventDefault()
        elecciones.forEach((element,indice) => {
            if (element.checked) {
                switch (indice) {
                    case 0: addComentario()
                            break
                    case 1: deleteComentario()
                            break
                    case 2: insertComentario()
                            break
                    case 3: replaceComentario()
                }
            }
        });
    })
    
    comentarios.addEventListener("click",e=>{
        if (e.target.dataset.id) {
            const article=comments.find(comment=>comment.id==e.target.dataset.id)
            console.log(article)
            article.estado=!article.estado
            if (article.estado) 
                seleccionados.push(e.target.dataset.id)
            else 
                seleccionados.splice(seleccionados.indexOf(e.target.dataset.id),1)
            renderComentarios()
        }
    })
    
    document.addEventListener("keydown",e=>{
        if (e.key=="Delete") {
            if (seleccionados.length) {
                seleccionados.forEach(sel=>{
                    comments.splice(comments.findIndex(el=>el.id==sel),1)
                    actualizarOpciones(false)
                })
                seleccionados=[]
                renderComentarios()
            }
        }
    })

    if (localStorage.getItem("comments")) {
        comments=JSON.parse(localStorage.getItem("comments"))
        comments.forEach(el=>{
            actualizarOpciones(1)
            if (el.estado)
                seleccionados.push(el.id)
        })
        renderComentarios()
    } else
        comments=[]
})