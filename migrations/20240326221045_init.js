/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('bookings-comedy',(table)=>{
        table.increments('id').primary()
        table.string('show_id')
        table.string('customer_name')
        table.string('email')
        table.string('num_tickets')
        table.string('total_price')

    })
                                                           // NW
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('bookings-comedy')
  
};
