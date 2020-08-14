const {subjects,weekdays,getSubjects} = require('./utils/format')
const Database = require('./database/db')
//funcionalidades
function pageLanding(req , res){
    return res.render("index.html") //,{proffys}
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


module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses
}