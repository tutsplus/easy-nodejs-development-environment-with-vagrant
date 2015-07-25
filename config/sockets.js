var mongoose = require('mongoose');
var Contact = mongoose.model('Contact');

module.exports = function (server) {
  var io = require('socket.io').listen(server);

  io.sockets.on('connection', function (socket) {
    socket.on('generateContacts', function () {
      var contact = Contact.generateSamples(5, function (err, contacts) {
        setTimeout(function () {
          if (err) {
            socket.emit('notification', {
              type: 'danger',
              message: err.message,
            });
          } else {
            socket.emit('notification', {
              type: 'success',
              message: 'Your robot contacts have been created',
            });
            socket.emit('contacts', contacts);
          }
        }, 3000);
      });
    });
  });
}
