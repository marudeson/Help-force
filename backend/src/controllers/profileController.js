const connection = require('../database/connection');


module.exports = {

 async index(request, response){
    const inst_id = request.headers.authorization;

    const incidents = await connection('incidents')
    .where('inst_id' , inst_id)
    .select('*');
    return response.json(incidents);

 }



}