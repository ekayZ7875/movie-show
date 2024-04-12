/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('music-seats', (table) => {
        table.increments('seat_id').primary()
        table.integer('show_id').unsigned();
        table.foreign('show_id').references('id').inTable('shows'); // Define the foreign key constraint.
        table.integer('available_seats').notNullable();
        table.timestamps(true,true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('music-seats');

};
