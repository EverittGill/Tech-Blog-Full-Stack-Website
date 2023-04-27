const Users = require('./users');
const Articles = require('./articles');

Users hasMany(Articles, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Articles.belongsTo(Users, {
    foreignKey: 'user_id'
});

