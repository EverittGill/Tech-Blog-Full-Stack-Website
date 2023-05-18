const User = require('./user');
const Article = require('./article');
const Comment = require('./comment');



User.hasMany(Article, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Article.hasMany(Comment, {
    foreignKey: 'article_id',
    onDelete: 'CASCADE'
  });
// new one
Article.belongsTo(User, {
    foreignKey: 'user_id',
});
  
Comment.belongsTo(Article, {
    foreignKey: 'article_id', 
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
})

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

module.exports = {
    // ... your other model exports,
    User, Article, Comment
  };
  