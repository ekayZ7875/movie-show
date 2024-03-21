exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('shows').del()
    .then(function () {
      // Inserts seed entries
      return knex('shows').insert([
        { id:1, movie_id: 1, theater_id: 1, start_time: '2024-03-16 15:00:00' },
        { id:1,movie_id: 2, theater_id: 2, start_time: '2024-03-16 18:00:00' },
        { id:1,movie_id: 1, theater_id: 1, start_time: '2024-03-16 21:00:00' }
      ]);
    });
};
