var async = require('async');
var faker = require('faker');
var mongoose = require('mongoose');

var schema = mongoose.Schema({
  firstName: String,
  lastName: String,
  streetAddress: String,
  zipCode: String,
  city: String,
  countryCode: String,
  email: String,
  phoneNumber: String,
  twitter: String,
  avatarUrl: String
});

schema.statics = {
  generateSamples: function (sampleSize, callback) {
    var self = this;

    async.times(sampleSize, function (n, next) {
      var userName = faker.helpers.slugify(faker.internet.userName()).replace(/\./g, '').substring(0, 15);

      new self({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        streetAddress: faker.address.streetAddress(),
        zipCode: faker.address.zipCode(),
        city: faker.address.city(),
        countryCode: faker.address.countryCode(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.phoneNumber(),
        twitter: userName,
        avatarUrl: "https://robohash.org/" + userName + "?size=80x80"
      }).save(function (err, contact) {
        next(err, contact);
      });
    }, callback);
  }
};

module.exports = mongoose.model('Contact', schema);
