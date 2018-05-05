const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost/puppybook', { logging: false });
const Op = Sequelize.Op;

/**
 * Define your models here, or organize them into separate modules.
 */
const Puppy = db.define('puppy', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'http://images.shape.mdpcdn.com/sites/shape.com/files/styles/slide/public/puppy-2_0.jpg',
  },
  likes: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

Puppy.beforeCreate(puppy => {
  puppy.name
    .trim()
    .split(/\s+/)
    .map(substr => {
      return substr[0].toUpperCase() + substr.substring(1).toLowerCase();
    })
    .join(' ');
});

Puppy.prototype.findPackmates = function() {
  return Puppy.findAll({
    where: {
      ownerId: this.id,
      id: {
        [Op.ne]: this.id,
      },
    },
  });
};

Puppy.findPopular = function() {
  return Puppy.findAll({
    where: {
      likes: {
        [Op.gte]: 5,
      },
    },
  });
};

const Owner = db.define('owner', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Owner.beforeCreate(owner => {
  owner.name
    .trim()
    .split(/\s+/)
    .map(substr => {
      return substr[0].toUpperCase() + substr.substring(1).toLowerCase();
    })
    .join(' ');
});

Puppy.belongsTo(Owner);
Owner.hasMany(Puppy);

module.exports = { db, Puppy, Owner };
