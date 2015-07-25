var contacts = require('../app/controllers/contacts');

module.exports = function (app) {
  app.param('id', contacts.load);
  app.get('/contacts', contacts.index);
  app.get('/contacts/new', contacts.new);
  app.post('/contacts', contacts.create);
  app.get('/contacts/:id/edit', contacts.edit);
  app.put('/contacts/:id', contacts.update);
  app.delete('/contacts/:id', contacts.destroy);

  app.get('/', contacts.index);
}
