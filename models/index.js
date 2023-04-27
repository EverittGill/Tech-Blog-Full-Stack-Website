const Users = require('./users');
const Articles = require('./articles');
const Comments = require('./comments');

Users.hasMany(Articles, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Articles.hasMany(Comments, {
    foreignKey: 'article_id',
    onDelete: 'CASCADE'
  });

Comments.belongsTo(Articles, {
    foreignKey: 'article_id', 
});