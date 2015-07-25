var mongoose = require('mongoose');
var Contact = mongoose.model('Contact');
var extend = require('util')._extend;

exports.load = function (req, res, next, id) {
  Contact.findOne({ _id : id }, function (err, contact) {
    if (err) return next(err);
    if (!contact) return next(new Error('Not Found'));
    req.contact = contact;
    next();
  });
};

exports.index = function (req, res) {
  Contact.find(function (err, contacts) {
    if (err) res.render('500');
    res.render('contacts/index', {
      contacts: contacts
    });
  });
};

exports.new = function (req, res) {
  res.render('contacts/new', {
    contact: new Contact()
  });
};

exports.create = function (req, res) {
  var contact = new Contact(req.body);
  contact.validate(function (err) {
    if (err) res.render('500');
    contact.save(function (err) {
      if (!err) {
        req.flash('success', 'Your contact has been created.');
        return res.redirect('/contacts');
      }
      res.render('contacts/new', {
        contact: contact,
        errors: err.errors || err
      });
    });
  });
};

exports.edit = function (req, res) {
  res.render('contacts/edit', {
    contact: req.contact
  });
};

exports.update = function (req, res) {
  var contact = req.contact;
  extend(contact, req.body);
  contact.validate(function (err) {
    if (err) res.render('500');
    contact.save(function (err) {
      if (!err) {
        req.flash('success', 'Your contact has been updated.');
        return res.redirect('/contacts');
      }
      res.render('contacts/edit', {
        contact: contact,
        errors: err.errors || err
      });
    });
  });
};

exports.destroy = function (req, res) {
  req.contact.remove(function (err) {
    req.flash('success', 'Your contact has been deleted.');
    res.redirect('/contacts');
  })
};
