/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('available_seats',(table)=>{
        table.increments('id').primary()
        table.integer('show_id').unsigned().references('id').inTable('comedy-shows')
        table.integer('num_available_seats').notNullable()
        table.timestamps(true,true)
            
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('available_seats')
  
};
