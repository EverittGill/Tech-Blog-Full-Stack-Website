const router = require('express').Router();
const { Articles, Users, Comments } = require('../models');
const User = require('../models/users');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all articles and JOIN with user data
    const articlesData = await Articles.findAll({
      include: [{ model: Comments, include: [Users], Users},
      ],
    });

    // Serialize data so the template can read it
    const articles = articlesData.map((articles) => articles.get({ plain: true }));

    res.render('homepage', { 
      articles, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/articles/:id', async (req, res) => {
  try {
    const articlesData = await Articles.findByPk(req.params.id, {
      include: [
        {
          model: Users,
          attributes: ['name'],
        },
      ],
    });

    const Articles = articlesData.get({ plain: true });

    res.render('', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/articles', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;





















