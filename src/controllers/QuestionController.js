module.exports = {
    index(req,res){
     const roomId = req.params.room;
     const questionID = req.params.question;
     const action = req.params.action;
     const password = req.body.password;

     console.log(`room = ${roomId}, questionID = ${questionID}, action = ${action} , password = ${password}`)



    },

    create(req,res){
        const question = req.body.question;
        const room = req.params.room
    }
}