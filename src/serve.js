
//configurar express
const express = require('express')
const serve = express()
const {
    pageLanding,
    pageStudy,
    pageGiveClasses
}  = require('./pages')

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

