// const sequelize = require('../config/connection');
// const { Users, Articles, Comments } = require('../models');

// const articlesData = require('./articlesData.json')
// const commentsData = require('./commentsData.json');
// const usersData = require('./usersData.json');

// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });

//   const users = await Users.bulkCreate(usersData, {
//     individualHooks: true,
//     returning: true,
//   });

//   for (const project of projectData) {
//     await Project.create({
//       ...project,
//       user_id: users[Math.floor(Math.random() * users.length)].id,
//     });
//   }

//   process.exit(0);
// };

// seedDatabase();








const sequelize = require('../config/connection');
const { User, Article, Comment } = require('../models');

const userData = require('./userData.json');
const articleData = require('./articleData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData);

  await Article.bulkCreate(articleData);

  await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();