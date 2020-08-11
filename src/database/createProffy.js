module.exports = async function(db, {proffyValue, classValue, classScheduleValues}){
    //inserir dados da table de teachers
    // db.run().then() ==  await db.run()

    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );


    `)

    const proffy_id = insertedProffy.lastID

    //inserir dados na tabela classes

    const insertedClass = await db.run(`
            INSERT INTO classes (
                subject,
                cust,
                proffy_id
            ) VALUES(
                "${classValue.subject}",
                "${classValue.cust}",
                "${proffy_id}"
            );
    `)

    const class_id = insertedClass.lastID

    //inserir dados na tabela classSchedule

    //o map() faz o mesmo que um forech, enquanto estiver elemento ele vai rodando e inserido
    //essa tabela ficou diferente pois ela é uma lista de valores já que pode ser adicionado mais de um dia e horario
      const insertedAllClassScheduleValues = classScheduleValues.map((value) => {
            return db.run(`
                INSERT INTO class_schedule(
                    class_id,
                    weekday,
                    time_from,
                    time_to
                ) VALUES (
                    "${class_id}",
                    "${value.weekday}",
                    "${value.time_from}",
                    "${value.time_to}"
                );
            `)
      })
    
      //aqui executar todos os db.run da s class_schedule

      await Promise.all(insertedAllClassScheduleValues)
}