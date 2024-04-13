exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Movie_Shows').del()
    .then(function () {
      // Inserts seed entries
      return knex('Movie_Shows').insert([
        { 
          Movie_name: 'Inception', 
          Movie_poster_URL: 'https://example.com/inception_poster.jpg', 
          Show_timings: '2024-04-13 18:00:00', 
          Theatre_name_location: 'ABC Theater - New York', 
          Available_Seats: 100, 
          Show_unique_ID: 'abc123' 
        },
        { 
          Movie_name: 'The Dark Knight', 
          Movie_poster_URL: 'https://example.com/dark_knight_poster.jpg', 
          Show_timings: '2024-04-13 20:00:00', 
          Theatre_name_location: 'XYZ Cinema - Los Angeles', 
          Available_Seats: 150, 
          Show_unique_ID: 'def456' 
        },
        { 
          Movie_name: 'Interstellar', 
          Movie_poster_URL: 'https://example.com/interstellar_poster.jpg', 
          Show_timings: '2024-04-14 15:00:00', 
          Theatre_name_location: 'PQR Multiplex - Chicago', 
          Available_Seats: 120, 
          Show_unique_ID: 'ghi789' 
        },
        { 
          Movie_name: 'The Shawshank Redemption', 
          Movie_poster_URL: 'https://example.com/shawshank_poster.jpg', 
          Show_timings: '2024-04-14 18:30:00', 
          Theatre_name_location: 'LMN Cinema - San Francisco', 
          Available_Seats: 90, 
          Show_unique_ID: 'jkl012' 
        },
        { 
          Movie_name: 'Pulp Fiction', 
          Movie_poster_URL: 'https://example.com/pulp_fiction_poster.jpg', 
          Show_timings: '2024-04-14 21:00:00', 
          Theatre_name_location: 'RST Theater - Miami', 
          Available_Seats: 80, 
          Show_unique_ID: 'mno345' 
        }
      ]);
    });
};
