
exports.up = function(knex) {
  
    
    return knex.schema.createTable('incidents' , function(table){
        table.increments(); //minusclo
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('inst_id').notNullable();

        table.foreign('inst_id').references('id').inTable('instituicao');
    
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');

  
};
