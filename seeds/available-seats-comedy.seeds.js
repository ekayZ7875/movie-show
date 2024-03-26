/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('available_seats').del()
  await knex('available_seats').insert([
   {
    id:1,
    show_id:1,
    num_available_seats:5
   },
   {
    id:2,
    show_id:3,
    num_available_seats:5
   },
   {
    id:3,
    show_id:2,
    num_available_seats:5
   }

  ]);
};
