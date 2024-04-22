/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('bookings',(t)=>{
        t.increments('booking_id').primary();
        t.string('booking_code').notNullable();
        t.string('user_name');
        t.string('email').notNullable();        
        t.integer('show_id').notNullable();
        t.enum('show_type',["comedy","music","movies"]).notNullable();
        t.integer('num_tickets').notNullable();
        t.integer('total_price').notNullable();
        t.string('QR_code_url');
})};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('bookings')
};