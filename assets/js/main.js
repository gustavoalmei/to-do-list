let form = document.querySelector("#novoItem")
let list = document.querySelector(".container__list ul")
let listSave = JSON.parse(localStorage.getItem("itens")) || [];

listSave.forEach(elemento =>{
    creatItem(elemento)
})

form.addEventListener("submit", (event)=>{
    event.preventDefault()

    let task = event.target.elements["value"];
    let atualItem = {
        item: task.value
    }

    const exist = listSave.find((elemento) => elemento.item === task.value)

    if(!exist){
        atualItem.id = listSave.length
        listSave.push(atualItem)
        creatItem(atualItem)
    }
    
    localStorage.setItem("itens", JSON.stringify(listSave))
    task.value = ""
})

function creatItem(data){
    let listLI = document.createElement("li")
    let itemLI = document.createElement("p")
    itemLI.classList.add("text__list")
    itemLI.id = data.id

    itemLI.innerHTML = data.item
    listLI.appendChild(itemLI)
    listLI.appendChild(buttonDel(data))
    list.appendChild(listLI)
    
}

function buttonDel(data){
    let button = document.createElement("button")
    button.classList.add("bttn")
    button.innerHTML = "<i class='fa-solid fa-trash'></i>"

    button.addEventListener("click", function(){
        delItem(this.parentElement, data.id)
    })

    return button
}

function delItem(tag, id){
    tag.remove()
    listSave.splice(listSave.findIndex(element => element.id === id), 1)
    localStorage.setItem("itens", JSON.stringify(listSave))
    atualizaLista(listSave)
}

function atualizaLista(data){

    for(let i = 0; i < data.length;i++){
        data[i].id = i
    }
    localStorage.setItem("itens", JSON.stringify(listSave))
}