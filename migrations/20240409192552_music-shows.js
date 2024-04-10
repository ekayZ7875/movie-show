/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('music-shows',(table)=>{
        table.increments('id').primary()
        table.string('title').notNullable()
        table.string('description')
        table.dateTime('start_time').notNullable()
        table.dateTime('end_time').notNullable()
        table.string('venue').notNullable()
        table.integer('price').notNullable()
      })  
  
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('music-shows')
};
