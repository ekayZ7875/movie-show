/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return knex.schema.createTable('shows', function (table) {
         table.increments('id').primary();
         table.integer('movie_id').unsigned().references('movies.id');
         table.integer('theater_id').unsigned().references('theaters.id');
         table.dateTime('start_time').notNullable();
         table.timestamps(true, true);
       })
   
 };
 
 /**
  * @param { import("knex").Knex } knex
  * @returns { Promise<void> }
  */
 exports.down = function(knex) {
 
    return knex.schema.dropTable('shows')
   
 };