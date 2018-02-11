module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ID: { 
      type: Sequelize.INTEGER,
      autoIncrement: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fee: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    regStart: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    regEnd: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Event.associate = (models) => {
    Event.hasMany(models.EventItem, {
      foreignKey: 'eventId',
      as: 'eventItems',
    });
  };

  return Event;
};