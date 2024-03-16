exports.seed = function(knex) {
  // Deletes all existing entries
  return knex('movies').del()
    .then(function () {
      // Inserts seed entries
      return knex('movies').insert([
      { id:1,
        title:'The Shawshank Redemption', 
        description:'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 
        poster_url:'https://example.com/shawshank_redemption_poster.jpg' 
      },
      { id:2,
        title:'The Godfather', 
        description:'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', 
        poster_url:'https://example.com/godfather_poster.jpg' 
      },
        
      ]);
    });
};
