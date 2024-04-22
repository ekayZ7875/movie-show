exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('movie_shows').del()
    .then(function () {
      // Inserts seed entries
      return knex('movie_shows').insert([
        { 
          movie_name: 'Inception', 
          movie_poster_URL: 'https://example.com/inception_poster.jpg', 
          show_timings: '2024-04-13 18:00:00', 
          theatre_name_location: 'ABC Theater - New York', 
          available_seats: 100, 
          show_unique_ID: 'abc123',
          ticket_price: 150.00,
        },
        { 
          movie_name: 'The Dark Knight', 
          movie_poster_URL: 'https://example.com/dark_knight_poster.jpg', 
          show_timings: '2024-04-13 20:00:00', 
          theatre_name_location: 'XYZ Cinema - Los Angeles', 
          available_seats: 150, 
          show_unique_ID: 'def456' ,
          ticket_price: 150.00,
        },
        { 
          movie_name: 'Interstellar', 
          movie_poster_URL: 'https://example.com/interstellar_poster.jpg', 
          show_timings: '2024-04-14 15:00:00', 
          theatre_name_location: 'PQR Multiplex - Chicago', 
          available_seats: 120, 
          show_unique_ID: 'ghi789',
          ticket_price: 150.00, 
        },
        { 
          movie_name: 'The Shawshank Redemption', 
          movie_poster_URL: 'https://example.com/shawshank_poster.jpg', 
          show_timings: '2024-04-14 18:30:00', 
          theatre_name_location: 'LMN Cinema - San Francisco', 
          available_seats: 90, 
          show_unique_ID: 'jkl012' ,
          ticket_price: 150.00,
        },
        { 
          movie_name: 'Pulp Fiction', 
          movie_poster_URL: 'https://example.com/pulp_fiction_poster.jpg', 
          show_timings: '2024-04-14 21:00:00', 
          theatre_name_location: 'RST Theater - Miami', 
          available_seats: 80, 
          show_unique_ID: 'mno345' ,
          ticket_price: 150.00,
        }
      ]);
    });
};
