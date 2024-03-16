/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
   {
    id:1,
    username:"Eklavya",
    email:"eklavyasinghparihar7875@gamil.com",
    password:"$2a$16$lfWo2sIMLu/WD5hwjxZqq.ax/x/1yC.pBI8aTpUzXhCsH7L8PFC6u",

   },
   {
    id:2,
    username:"Arpita",
    email:"arpita123@gmail.com",
    password:"$2a$16$lfWo2sIMLu/WD5hwjxZqq.ax/x/1yC.pBI8aTpUzXhCsH7L8PFC6u",
   },
   {
      id:3,
      username:"Mohit",
      email:"mohit123@gmail.com",
      password:"$2a$16$lfWo2sIMLu/WD5hwjxZqq.ax/x/1yC.pBI8aTpUzXhCsH7L8PFC6u"
   },
   {
    id:4,
    username:"Mudit",
    email:"mudit123@gmail.com",
    password:"$2a$16$lfWo2sIMLu/WD5hwjxZqq.ax/x/1yC.pBI8aTpUzXhCsH7L8PFC6u",
   },
   {
    id:5,
    username:"Manass",
    email:"manass123@gmail.com",
    password:"$2a$16$lfWo2sIMLu/WD5hwjxZqq.ax/x/1yC.pBI8aTpUzXhCsH7L8PFC6u"
   }
   
  ]);
};
