/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('music_shows').del()
  await knex('music_shows').insert([
    {
      music_show_id: 1,
      show_name: 'Concert in the Park',
      show_poster_URL: 'https://example.com/concert-poster.jpg',
      show_timings: '2024-04-20 18:00:00',
      venue: 'Central Park',
      available_seats: 500,
      show_unique_ID: 'CP20240420',
      ticket_price: 30
    },
    {
      music_show_id: 2,
      show_name: 'Rock Legends Live',
      show_poster_URL: 'https://example.com/rock-legends-poster.jpg',
      show_timings: '2024-04-22 20:00:00',
      venue: 'Rock Arena',
      available_seats: 1000,
      show_unique_ID: 'RL20240422',
      ticket_price: 40
    }
  ]);
};
