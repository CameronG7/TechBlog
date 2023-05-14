const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { User,Post } = require('../../models');

// /home routes to the home page
router.get('/',  async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['username', 'ASC']]
    });

    const users = userData.map((project) => project.get({ plain: true }));
    res.redirect('/login');
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});
// /dashboard routes to the dashboard page
router.get('/dashboard', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user.id, {
      attributes: { exclude: ['password'] },
      order: [['username', 'ASC']],
      include: [{ model: Post, attributes: ['id', 'title', 'comment', ] }]
    });

    const user = userData.get({ plain: true });

    //if no user is signed in, redirect to the login page
    if (!req.session.logged_in) {
      res.redirect('/login');
      return;
    }
    console.log(user);
    res.render('dash', {
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// /signin routes to the sign-in page
router.get('/login', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  try {
    res.render('login', {});
  } catch (error) {
    res.status(500).json({ error });
  }
});

// /signup routes to the sign-up page
router.get('/signup', async (req, res) => {
  try {
    res.render('signup', {});
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
