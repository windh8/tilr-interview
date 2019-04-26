exports.up = function (knex) {
  return knex.schema.createTable('questions', (table) => {
    table.increments('question_id')
    table.string('text')
    table.string('tag')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('questions')
}
