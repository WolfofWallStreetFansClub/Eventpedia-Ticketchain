const Events = require('../models').Event;
const EventItem = require('../models').EventItem;
const activeId = 1;
const expiredId = 2;

module.exports = {
  create(req, res) {
    return Events
      .create({
        title: req.body.name
      })
      .then(events => res.status(201).send(events))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Events
    .findAll()
    .then(events => res.status(200).send(events))
    .catch(error => res.status(400).send(error));
  }
};