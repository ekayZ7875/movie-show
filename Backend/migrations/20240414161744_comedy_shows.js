/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('comedy_shows',(table)=>{
        table.increments('comedy_show_id').primary()
        table.string('show_name').notNullable()
        table.string('show_poster_URL')
        table.dateTime('show_timings').notNullable()
        table.string('venue').notNullable()
        table.integer('available_seats').notNullable()
        table.string('show_unique_ID')
        table.integer('ticket_price').notNullable()
})};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('comedy_shows')
};

