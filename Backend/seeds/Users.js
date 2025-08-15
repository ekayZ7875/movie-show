exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { FullName: 'John Doe', Email: 'john@example.com', DOB: '1990-01-01', Password: 'password123', Gender: 'Male' },
        { FullName: 'Jan Smith', Email: 'jane@example.com', DOB: '1995-05-15', Password: 'securepass', Gender: 'Female' },
        { FullName: 'Michael Johnson', Email: 'michael@example.com', DOB: '1985-07-20', Password: 'mysecret', Gender: 'Male' },
        { FullName: 'Emily Brown', Email: 'emily@example.com', DOB: '1988-03-10', Password: 'password123', Gender: 'Female' },
        { FullName: 'Christopher Lee', Email: 'chris@example.com', DOB: '1992-11-28', Password: 'chrispass', Gender: 'Male' }
      ]);
    });
};
