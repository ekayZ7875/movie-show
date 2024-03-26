/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('comedy-shows').del()
  await knex('comedy-shows').insert([
    { id:1, title: 'Funny Night', description: 'A hilarious comedy show', 'start-time': '2024-03-16 20:00:00', 'end-time': '2024-03-16 22:00:00', venue: 'Comedy Club', 'ticket-price': 20 },
    { id:2, title: 'Laughs Galore', description: 'An evening filled with laughter', 'start-time': '2024-03-17 19:30:00', 'end-time': '2024-03-17 21:30:00', venue: 'Funny Theater', 'ticket-price': 15 },
    { id:3, title: 'Comedy Extravaganza', description: 'A showcase of the best comedians', 'start-time': '2024-03-18 21:00:00', 'end-time': '2024-03-18 23:00:00', venue: 'Joke Hall', 'ticket-price': 25 }

  ]);
}
