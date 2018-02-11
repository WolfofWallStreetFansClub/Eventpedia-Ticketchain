'use strict';
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define('Event', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Event.hasMany(models.EventItem, {
          foreignKey: 'eventId',
          as: 'eventItems',
        });
      }
    }
  });
  return Event;
};