//procurar o botão
document.querySelector("#add-time")

//quando clicar no botão
.addEventListener('click',cloneField)


//executar uma ação
function cloneField(){
    //duplicar os campos
    const AddNewTime = document.querySelector('.schedule-item').cloneNode(true) //cloneNode()true clona a div .schedule-item e todo o conteudo dela

    //limpar os campos: que campos? achando o campo
    const field = AddNewTime.querySelectorAll('input')

    //limpando os campos inserido vazio
    field.forEach(function(field){
        field.value=""
    })

    //mostrar na tela : onde?
    document.querySelector('#schedule-id').appendChild(AddNewTime)
}