const router = require('express').Router();
const { User,Post } = require('../../../models');

router.get('/',  async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['username', 'ASC']],
      include: [{ model: Post, attributes: ['id', 'title', 'comment', ] }],
    });

    const users = userData.map((project) => project.get({ plain: true }));
    res.json(users)
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post('/signup', async (req, res) => {
  try{  
    console.log(typeof req.body)

    const userData = await User.create(req.body)
   
    req.session.save(() => {
      // save user property on the req.session object and set it to the user that was just created
      req.session.user = userData.get({plain: true});
     

      req.session.logged_in = true

      res.status(200).json(userData)
    })
    
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
}
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });
    console.log(userData.id, "user routes line 30")
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user = userData;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.json({success: true});
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;