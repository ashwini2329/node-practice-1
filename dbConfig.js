const Sequelize = require('sequelize')

const sequelize = new Sequelize('node_practice_1', 'root', 'mySQL2329', {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;