const connection = require('../database/connection');

module.exports = {
    
    async create(request,response){
        const {id} = request.body;
        const inst = await connection('instituicao')
            .where('id' , id)
            .select('name')
            .first();

         if(!inst){
             return response.status(400).json({error: 'No institution with this id'})

            }
         return response.json(inst);
    }

}