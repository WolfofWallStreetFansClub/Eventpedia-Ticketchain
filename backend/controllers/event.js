const Event = require('../models').EventItem;
const uuidv1 = require('uuid/v1');
const activeId = 1;
const inactiveId = 2;
module.exports = {
  createActive(req, res) {
    return Event
      .create({
        name: req.body.name,
        location: req.body.location,
        description: req.body.description,
        fee: req.body.fee,
        date: req.body.date,
        regStart: req.body.regStart,
        regEnd: req.body.regEnd,
        eventId: activeId,
        hash: uuidv1()
      })
      .then(event => res.status(201).send(event))
      .catch(error => res.status(400).send(error));
   },
   createInactive(req, res) {
    return Event
      .create({
        name: req.body.name,
        location: req.body.location,
        description: req.body.description,
        fee: req.body.fee,
        date: req.body.date,
        regStart: req.body.regStart,
        regEnd: req.body.regEnd,
        eventId: inactiveId,
        hash: uuidv1()
      })
      .then(event => res.status(201).send(event))
      .catch(error => res.status(400).send(error));
   },
   list(req, res) {
    return Event
    .all()
    .then(event => res.status(200).send(event))
    .catch(error => res.status(400).send(error));
  },
  getEvent(req, res) {
    return Event
    .findOne({
      where: {
        hash: req.params.hash
      }
    })
    .then(event => res.status(200).send(event))
    .catch(error => res.status(400).send(error));
  },
  activeList(req, res) {
    return Event
    .findAll({ 
      where: {
      eventId: activeId
      } 
    })
    .then(event => res.status(200).send(event))
    .catch(error => res.status(400).send(error));
  },
  inactiveList(req, res) {
    return Event
    .findAll({ 
      where: {
      eventId: inactiveId
      } 
    })
    .then(event => res.status(200).send(event))
    .catch(error => res.status(400).send(error));
  }
};