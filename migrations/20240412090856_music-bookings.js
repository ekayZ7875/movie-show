/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('music-bookings',(table)=>{
        table.integer('booking_id').primary();
        table.integer('show_id').unsigned();
        table.foreign('show_id').references('id').inTable('music-shows');
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('id').inTable('users'); // Define the foreign key constraint.
        table.string('customer_name').notNullable();
        table.string('email')
        table.string('num_tickets').notNullable();
        table.string('total_price').notNullable();

    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('music-bookings');  
};
