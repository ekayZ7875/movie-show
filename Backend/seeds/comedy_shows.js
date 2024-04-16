/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('comedy_shows').del()
  await knex('comedy_shows').insert([
    {
      comedy_show_id: 1,
      show_name: 'The Comedy Club',
      show_poster_URL: 'https://example.com/comedy-club-poster.jpg',
      show_timings: '2024-04-16 20:00:00',
      venue: 'Comedy Club Theater',
      available_seats: 100,
      show_unique_ID: 'CC20240416',
      ticket_price: 20
    },
    {
      comedy_show_id: 2,
      show_name: 'Laugh Factory',
      show_poster_URL: 'https://example.com/laugh-factory-poster.jpg',
      show_timings: '2024-04-18 19:30:00',
      venue: 'Laugh Factory Theater',
      available_seats: 150,
      show_unique_ID: 'LF20240418',
      ticket_price: 25
    }
  ]);
};
