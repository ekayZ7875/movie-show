// 01_music_shows.js

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('music-shows').del()
    .then(function () {
      // Inserts seed entries
      return knex('music-shows').insert([
        {
          title: 'Concert 1',
          description: 'Description of Concert 1',
          'start-time': new Date('2024-04-15T19:00:00'),
          'end-time': new Date('2024-04-15T22:00:00'),
          venue: 'Venue 1',
          'ticket-price': 20
        },
        {
          title: 'Concert 2',
          description: 'Description of Concert 2',
          'start-time': new Date('2024-04-20T18:30:00'),
          'end-time': new Date('2024-04-20T21:30:00'),
          venue: 'Venue 2',
          'ticket-price': 25
        },

      ]);
    });
};
