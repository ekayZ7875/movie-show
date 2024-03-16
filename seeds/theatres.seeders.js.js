exports.seed = function(knex) {
  // Deletes all existing entries
  return knex('theaters').del()
    .then(function () {
      // Inserts seed entries
      return knex('theaters').insert([
      { id:1, 
        name: 'AMC Empire 25', 
        location: 'New York City' 
      },
      { id:2,
        name: 'Regal Cinemas LA LIVE',
         location: 'Los Angeles'
      },
        // Add more theaters as needed
      ]);
    });
};
