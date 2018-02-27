module.exports = (sequelize, DataTypes) => {
  const EventItem = sequelize.define('EventItem', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
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
    }});
    
  EventItem.associate = (models) => {
    EventItem.belongsTo(models.Event, {
      foreignKey: 'eventId',
      onDelete: 'CASCADE',
    });
  };

  return EventItem;
};