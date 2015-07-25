function createNotification(type, message) {
  var alert = $('<div>')
    .addClass('fade in alert alert-dismissable alert-' + type)
    .html('<button type="button" class="close" data-dismiss="alert">×</button>' + message);
  $('.notifications').append(alert);
  window.setTimeout(function() {
    alert.alert('close');
  }, 1500);
}

$(document).on('ready', function () {
  var socket = io.connect(document.origin);
  socket.on('notification', function(data) {
    createNotification(data.type, data.message);
  });

  socket.on('contacts', function (contacts) {
    contacts.forEach(function (contact) {
      var element = $('.sample-contact').clone();
      element.removeClass('sample-contact hidden').addClass('col-sm-4');
      element.find('.avatar').attr('src', contact.avatarUrl);
      element.find('.edit-link').attr('href', "/contacts/" + contact._id + "/edit");
      element.find('form').attr('action', "/contacts/" + contact._id);
      element.find('.firstName').text(contact.firstName);
      element.find('.lastName').text(contact.lastName);
      element.find('.twitter-link').attr('href', "https://twitter.com/" + contact.twitter);
      element.find('.twitter').text(contact.twitter);
      element.find('.streetAddress').text(contact.streetAddress);
      element.find('.countryCode').text(contact.countryCode);
      element.find('.zipCode').text(contact.zipCode);
      element.find('.city').text(contact.city);
      element.find('.phone').text(contact.city);
      element.find('.email').text(contact.email);

      $('.contacts').prepend(element);
    });

    $('.contacts .col-sm-12').remove();
  });

  $('#generate-samples').on('click', function (e) {
    e.preventDefault();

    createNotification('info', 'Your request has been dispatched');

    socket.emit('generateContacts');
  })
});
