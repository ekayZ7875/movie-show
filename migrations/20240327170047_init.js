/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('bookings-comedy_1',(table)=>{
        table.increments('id').primary()
        table.integer('show_id')
        table.string('customer_name')
        table.string('email')
        table.integer('num_tickets')
        table.integer('total_price')

    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('bookings-comedy_1')
  
};
