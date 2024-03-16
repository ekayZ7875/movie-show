/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return  knex.schema.createTable('employees', function (table) {
        table.increments('id').primary();
        table.string('username_e').notNullable().unique();
        table.string('email_e').notNullable().unique();
        table.string('password_e').notNullable();
        table.timestamps(true, true);
      })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return  knex.schema.dropTable('employees')
  
};