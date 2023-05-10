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

Comment.belongsTo(Article, {
    foreignKey: 'article_id', 
});




module.exports = {
    // ... your other model exports,
    User, Article, Comment
  };
  