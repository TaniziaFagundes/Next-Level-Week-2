const Database = require('./db')
const createProffy  = require('./createProffy')

Database.then( async (db) => {  //async pois estou usando await na chamada de function createProffy na linha 32
    //inserir dados

    proffyValue = {
        name:"Tanizia Fagundes",
        avatar:"https://avatars1.githubusercontent.com/u/51212859?s=400&u=d3a448dd722c66cafa7f10bd79a54cc9bd870299&v=4",
        whatsapp: "0000011111", 
        bio: "Quisque faucibus massa quis porta facilisis.<br><br>Nullam suscipit nunc nec nisl euismod rutrum. Morbi hendrerit lacus sit amet egestas dapibus. Nullam iaculis urna nisl, id dictum metus maximus in. Maecenas vestibulum, eros eget semper volutpat, libero odio molestie mauris, at imperdiet libero turpis vel lectus. Nunc mollis tortor id condimentum porta"
    }

    classValue = {
        subject: "Geografia",
        cust:"20"
    }

    classScheduleValues = [
        {
            weekday: 2,
            time_from: 720,
            time_to:1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to:1220
        }
    ]

    await createProffy(db, {proffyValue, classValue, classScheduleValues})
})