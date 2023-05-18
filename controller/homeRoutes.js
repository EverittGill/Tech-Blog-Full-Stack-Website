const router = require('express').Router();
const { Article, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  console.log(req.session)
  try {
    // Get all articles and JOIN with user data
    const articlesData = await Article.findAll({
      include: [{ model: Comment, include: [{ model: User}] },
      ],
    });

    // Serialize data so the template can read it
    const article = articlesData.map((article) => article.get({ plain: true }));
    console.log(article)
    res.render('homepage', { 
      logged_in: req.session.logged_in,
      article
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get one article and comments
router.get('/article/:id', async (req, res) => {
  try {
    // Get all articles and JOIN with user data
    const articleData = await Article.findByPk(req.params.id, {
      include: [{ model: Comment, include: [User], User},
      ],
    });
    const articles = articleData.get({ plain: true });
    // add is_author property to article data to use in handlebars

    // Add is_author property to each comment object
    article.comments.forEach(comment => {
      comment.is_author = req.session.user_id === comment.user_id;
    });

    // Serialize data so the template can read it
    res.render('single-article', { 
      articles, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});







// Use withAuth middleware to prevent access to route
router.get('/edit-article/:id', withAuth, async (req, res) => {
  try {
    const articleData = await Article.findByPk(req.params.id, {
      include: User,
    });
    const article = articleData.get({ plain: true });
    console.log(article)
    if(article.user_id !== req.session.user_id) {
      res.status(403).json({ message: 'You are not the author so you cannot edit this article.' });
    } else {
      res.render('edit-article', {
        article,
        logged_in: req.session.logged_in
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// need get route for homepage
router.get('/homepage', async (req, res) => {
  res.render('homepage');
});

// need get route for dashboard
// the get route needs to render the name from the user model and all the articles that were written by that user

router.get('/dashboard', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [{model: Article }, { model: Comment, include: [Article] }]
    });

    const user = userData.get({ plain: true });
    res.render('dashboard', { 
      user, 
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



// router.get('/dashboard', async (req, res) => {
//   let articles = await Article.findAll()
//   articles = articles.map((article) => article.get({ plain: true }))
//   console.log(articles)
//   res.render('dashboard', {logged_in: req.session.logged_in, articles});
// });


// need get route for new article
router.get('/new-article', async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  res.render('new-article');
});













router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

module.exports = router;





















