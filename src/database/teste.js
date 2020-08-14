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
        subject: "1",
        cust:"20"
    }

    classScheduleValues = [
        {
            weekday: 2,
            time_from: 720,
            time_to:1220
        },
        {
            weekday: 1,
            time_from: 520,
            time_to:1220
        }
    ]

    //await createProffy(db, {proffyValue, classValue, classScheduleValues})

    const selectedProffys = await db.all("SELECT * FROM proffys")
    //console.log(selectedProffys)
    
    //consultar as classes de um determinado professor 
    //e trazer junto os dados do professor

    const selectClasseseAndProffys = await db.all(`
        SELECT classes.* , proffys.* 
        FROM proffys
        JOIN classes ON (proffys.id = classes.proffy_id)
        WHERE classes.proffy_id = 1;
    `)

   // console.log(selectClasseseAndProffys)

   //horario que a pessoa trabalha por exemplo é das 8h -18h
   //o horario do time_from(8h) precisa ser menor ou igual ao horario solicitado
   //o time_to precisa ser acima
   const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = 1
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "520" 
    `)

    console.log(selectClassesSchedules)
})
