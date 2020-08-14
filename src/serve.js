
//configurar express
const express = require('express')
const serve = express()
const {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses 
}  = require('./pages')

//configurar nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: serve,
    noCache: true
})

serve
//receber os dados do req.body
.use(express.urlencoded({extended :  true}))


//configurar arquivos estáticos (css, scripts, imgens)
.use(express.static("public"))
//rotas da aplicação
.get("/index", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)

.listen(5500)

