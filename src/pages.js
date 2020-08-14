const {subjects,weekdays,getSubject, convertHoursToMinutes} = require('./utils/format')
const Database = require('./database/db')

//funcionalidades
function pageLanding(req , res){
    return res.render("index.html") //,{proffys}
}

async function pageStudy(req, res){
    const filters =req.query
    
    if(!filters.subject || !filters.time || !filters.weekday){
        return res.render("study.html",{filters, subjects, weekdays})
    }

    //converter horas em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)
    
    const query = `
    SELECT classes.* , proffys.*
    FROM proffys
    JOIN classes ON (proffys.id = classes.proffy_id)
    WHERE EXISTS (
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = classes.id
        AND class_schedule.weekday = ${filters.weekday}
        AND class_schedule.time_from <= ${timeToMinutes}
        AND class_schedule.time_to > ${timeToMinutes}
    )
    AND classes.subject = '${filters.subject}'
    `
    //caso haja erro na hora da consulta do banco de dados
    try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })

        return res.render('study.html',{proffys, subjects, filters, weekdays})
    } catch (error) {
        console.log(error)
    }
}

function pageGiveClasses(req, res){
 
    return res.render("give-classes.html",{subjects, weekdays})
}

async function saveClasses(req,res){

    const createProffy = require('./database/createProffy')
    
    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio

    }

    const classValue = {
        subject: req.body.subject,
        cust: req.body.cust

    }

    const classScheduleValues = req.body.weekday.map((weekday,index) => {
        return {
            weekday: weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to:convertHoursToMinutes(req.body.time_to[index])
        }
    })

 try {
    const db = await Database
    await createProffy (db, { proffyValue, classValue, classScheduleValues })

    
    let queryString = "?subject=" + req.body.subject
    queryString = queryString + "&weekday=" + req.body.weekday[0]
    queryString = queryString + "&time=" + req.body.time_from[0]

    return res.redirect("/study" + queryString)

 } catch (error) {
     console.log(erro)
 }

}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}

/*
 const isEmpty = Object.keys(data).length > 0 //lenght verifica a quantidade de objetos que tem se for != 0  ele entra na codição

    if (isEmpty) {
        proffys.push(data)

        data.subject = getSubject(data.subject) transformando os numeros da base de dados em nomes de dias da semana
        return res.redirect("/study") //redireciona para a pagina dos professores disponiveis após fazer a inscrição
    }else{

    }
*/