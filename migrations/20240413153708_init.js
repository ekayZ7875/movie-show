/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Movie_Shows',(table)=>{
        table.increments('id').primary()
        table.string('Movie_name').notNullable()
        table.string('Movie_poster_URL')
        table.dateTime('Show_timings')
        table.string('Theatre_name-location').notNullable()
        table.integer('Available_Seats').notNullable()
        table.string('Show_unique_ID')
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Movie_Shows')
  
};