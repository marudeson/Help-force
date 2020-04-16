const connection = require('../database/connection');
const crypto = require('crypto');
module.exports = {
    
    async index(request, response){

        const instituicao = await connection('instituicao').select('*');
        return response.json(instituicao);
    
    },
    
    //create
    async create(request , response){

        const {name, email, whatsapp, city, uf} = request.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await connection('instituicao').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,


    })
      return response.json({ id  });


    }

    
    
};