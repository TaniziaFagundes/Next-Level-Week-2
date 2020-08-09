const proffys = [
    {
    name:"Tanizia Fagundes",
    avatar:"https://avatars1.githubusercontent.com/u/51212859?s=400&u=d3a448dd722c66cafa7f10bd79a54cc9bd870299&v=4",
    whatsapp: "0000011111", 
    bio: "Quisque faucibus massa quis porta facilisis.<br><br>Nullam suscipit nunc nec nisl euismod rutrum. Morbi hendrerit lacus sit amet egestas dapibus. Nullam iaculis urna nisl, id dictum metus maximus in. Maecenas vestibulum, eros eget semper volutpat, libero odio molestie mauris, at imperdiet libero turpis vel lectus. Nunc mollis tortor id condimentum porta",
    subject: "Geografia",
    cust:"20",
    weekday: [1],
    time_from:[720], //720 segundos
    time_to:[1220]
},
{
    name:"Matheus Dantas",
    avatar:"https://avatars2.githubusercontent.com/u/48462567?s=460&u=c4f7a0369ce57e9003a7ed9cff3f18f63572bfbf&v=4",
    whatsapp: "0000011111", 
    bio: "Quisque faucibus massa quis porta facilisis.<br><br>Nullam suscipit nunc nec nisl euismod rutrum. Morbi hendrerit lacus sit amet egestas dapibus. Nullam iaculis urna nisl, id dictum metus maximus in. Maecenas vestibulum, eros eget semper volutpat, libero odio molestie mauris, at imperdiet libero turpis vel lectus. Nunc mollis tortor id condimentum porta",
    subject: "Alguma coisa ele te ensina",
    cust:"40",
    weekday: [2],
    time_from:[720], //720 segundos
    time_to:[1220]
}
]

const subjects = 
[
        "Artes",
        "Biologia",
        "Ciências",
       "Educação física",
        "Física",
        "Geografia",
        "História",
        "Matemática",
        "Português",
        "Química",  
]

const weekdays = 
[
"Domingo",
"Segunda-feira",
"Terça-feira",
"Quarta-feira",
"Quinta-feira",
"Sexta-feira",
"Sábado",
]

//funcionalidades
function pageLanding(req , res){
    return res.render("index.html",{proffys})
}

function pageStudy(req, res){
    const filters =req.query
    return res.render("study.html",{proffys, filters, subjects, weekdays})
}

function pageGiveClasses(req, res){
    const data = req.query
    const isEmpty = Object.keys(data).length > 0 //lenght verifica a quantidade de objetos que tem se for != 0  ele entra na codição

    if (isEmpty) {
        proffys.push(data)

        data.subject = getSubject(data.subject) //transformando os numeros da base de dados em nomes de dias da semana
        return res.redirect("/study") //redireciona para a pagina dos professores disponiveis após fazer a inscrição
    }else{

    }

    return res.render("give-classes.html",{subjects, weekdays})
}

function getSubject(subjectNumber){
    const position = +subjectNumber -1
    return subjects[position]
}


//configurar express
const express = require('express')
const serve = express()

//configurar nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: serve,
    noCache: true
})

//configurar arquivos estáticos (css, scripts, imgens)
serve.use(express.static("public"))
//rotas da aplicação
.get("/index", pageLanding)
.get("/give-classes", pageGiveClasses)
.get("/study", pageStudy)

.listen(5500)

