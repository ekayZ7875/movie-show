/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Users',(table)=>{
        table.increments('id').primary()
        table.string('FullName').notNullable()
        table.string('Email').notNullable()
        table.date('DOB')
        table.string('Password').notNullable()
        table.enum('Gender',['Male','Female'])
        table.timestamps(true,true)
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Users');
};
