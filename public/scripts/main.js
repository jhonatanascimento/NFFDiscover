import { Modal } from './modal.js'

const modal = Modal()

const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')

//Pegar todos os botoes que existe com a classe check
const checkButtons = document.querySelectorAll('.actions a.check')

//adicionar o event listener em todo o array do query selector all
checkButtons.forEach(button => {
    button.addEventListener('click',handleClick)
})


// acao d botao delete das perguntas
const deleteButton = document.querySelectorAll(".actions a.delete")

deleteButton.forEach(button => {
    button.addEventListener("click", (event) => handleClick(event, false))
    })

//Botão cancelar da modal
const btnModalCancelar = document.querySelector('.modal .buttons .cancel')

btnModalCancelar.addEventListener('click', event => {
    modal.close()
})


function handleClick(event, check = true){
    const text = check ? "Marcar como lida" : "Excluir"
    const slug = check ? "check" : "delete"

    const roomId = document.querySelector('#room-id').dataset.id
    const questionID = event.target.dataset.id


    const form = document.querySelector('.modal form')
    form.setAttribute("action", `/room/${roomId}/${questionID}/${slug}`)

    modalTitle.innerHTML = `${text} essa pergunta`
    modalDescription.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`
    modalButton.innerHTML = `Sim, ${text.toLowerCase()} `
    check? modalButton.classList.remove("red") : modalButton.classList.add("red")
    modal.open()
}


