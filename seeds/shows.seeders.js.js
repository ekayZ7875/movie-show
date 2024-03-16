/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('shows').del()
  await knex('shows').insert([
    {
      id:1,
      movie_id:2,
      theater_id:1,
      start_time:"2-12-2025"
    },
    {
      id:2,
      movie_id:2,
      theater_id:2,
      start_time:"2-12-2025"
    }
    
  ]);
};
