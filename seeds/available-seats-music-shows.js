/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('music-seats').del()
  await knex('music-seats').insert([
   {
    
    show_id:'1',
    available_seats:'20'
   },
   {
   
    show_id:'2',
    available_seats:'50'
   },
  
  ]);
};
