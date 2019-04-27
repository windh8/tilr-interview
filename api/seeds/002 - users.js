exports.seed = async (knex) => {
  await knex.batchInsert('users', [
    /*{
      name: 'user1',
      password:  'password1'
    }*/
  ])
}
