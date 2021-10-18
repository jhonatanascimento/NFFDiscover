const Database = require("../db/config")

module.exports = {
    async create(req, res) {
        const db = await Database()
        const pass = req.body.password


        let roomId
        let isRoom = true;

        // loop para verificar se já existe o id da sala no banco de dados

        while (isRoom) {

            // gera random o numero da sala
            for (var i = 0; i < 6; i++) {
                i == 0 ? roomId = Math.floor(Math.random() * 10).toString() :
                    roomId += Math.floor(Math.random() * 10).toString()
            }

            // pega a tabela no banco e percorre com o some para verificar se algum id é igual o id atual que pegamos db.all pega tudo do banco em um array
            const roomsExistIds = await db.all(`SELECT id FROM rooms`);
            isRoom = roomsExistIds.some(roomsExistIds => roomsExistIds === roomId)


            // se isRoom for falso insere no banco
            if (!isRoom) {
                await db.run(
                    `INSERT INTO rooms(
                id,
                pass
                )
    
                VALUES (
                    ${parseInt(roomId)},
                    ${pass}
                )`
                )

            }




        }


        await db.close()
        res.redirect(`/room/${roomId}`)
    },

    async open(req, res) {
        const db = await Database()
        const roomId = req.params.room;
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 1`)
        let isNoQuestions

        if(questions.length == 0){
            if(questionsRead.length == 0){
                isNoQuestions = true
            }
        }

        res.render("room", { roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions })
    },

    enter(req, res) {
        const roomId = req.body.roomId

        res.redirect(`/room/${roomId}`)
    }
}