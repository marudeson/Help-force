const connection = require('../database/connection');

module.exports = {

           //create
async create(request,response){
        const {title,description,value} = request.body;
        const inst_id = request.headers.authorization;
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            inst_id,
        });

        return response.json({id});
    },

    //listar
async index(request,response){
    const {page = 1} = request.query;
    const [count] = await connection('incidents').count();
    const incidents = await connection('incidents')
       .join('instituicao' , 'instituicao.id', '=', 'incidents.inst_id' )
       .limit(5)
       .offset((page - 1 ) * 5)
       .select(['incidents.*',
       'instituicao.name',
       'instituicao.email',
       'instituicao.whatsapp',
       'instituicao.city',
       'instituicao.uf',
       ]);

    response.header('x-total-count' , count['count(*)']);
   return response.json(incidents);

    },

         //deletar
async delete(request,response){
    const { id } = request.params;
    const inst_id = request.headers.authorization;
    const incident = await connection('incidents')
        .where('id' , id)
        .select('inst_id')
        .first();
    if(incident.inst_id != inst_id){
        return response.status(401).json({error : 'operation not permitted'});
    
         }
        await connection('incidents').where('id',id).delete();
        return response.status(204).send();
    }




};