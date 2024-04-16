/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('movie_shows',(table)=>{
        table.increments('movie_id').primary()
        table.string('movie_name').notNullable()
        table.string('movie_poster_URL')
        table.dateTime('show_timings').notNullable()
        table.string('theatre_name_location').notNullable()
        table.integer('available_seats').notNullable()
        table.string('show_unique_ID')
        table.integer('ticket_price').notNullable()
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('movie_shows')
  
};