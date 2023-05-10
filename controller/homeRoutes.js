const router = require('express').Router();
const { Article, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all articles and JOIN with user data
    const articlesData = await Article.findAll({
      include: [{ model: Comment, include: [User], User},
      ],
    });

    // Serialize data so the template can read it
    const articles = articlesData.map((articles) => articles.get({ plain: true }));

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
    const articles = articleData.get({ plain: true });

    if(article.user_id !== req.session.user_id) {
      res.status(403).json({ message: 'You are not the author so you cannot edit this article.' });
    } else {
      res.render('edit-article', {
        articles,
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
router.get('/dashboard', async (req, res) => {
  res.render('dashboard');
});


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





















