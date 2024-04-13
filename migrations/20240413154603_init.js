/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('Movie_Shows', (table) => {
        // Rename column from 'Theatre_name-location' to 'Theatre_name_location'
        table.renameColumn('Theatre_name-location', 'Theatre_name_location');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('Movie_Shows', (table) => {
        // Undo the column name change
        table.renameColumn('Theatre_name_location', 'Theatre_name-location');
    });
};
