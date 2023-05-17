const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { User, Post, Comment } = require('../../models');

// /home routes to the home page
router.get('/', async (req, res) => {
  try {
    const postData = await User.findAll({ //take all users and grab only their posts
      attributes: { exclude: ['password', 'email'] },
      order: [['id', 'ASC']],
      include: [{ model: Post, order: [['id', 'ASC']] }]
    });
    
    const users = postData.map((project) => project.get({ plain: true }));
    const posts = postData.flatMap((project) => //flatten the array of arrays of posts
      project.get( 'posts',{ plain: true })
    );

    console.log(posts);
    console.log(users);

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const user = users.find((user) => user.id === post.userId);
      post.username = user.username;
    }
   
    res.render('home', {
      posts,
      users
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});
// /dashboard routes to the dashboard page
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user.id, {
      attributes: { exclude: ['password'] },
      order: [['username', 'ASC']],
      include: [{ model: Post, attributes: ['id', 'title', 'comment'] }]
    });

    const user = userData.get({ plain: true });

    console.log(user);
    res.render('dash', {
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
     
      include: [
        { 
        model: Comment, 
        attributes: ['id', 'content', 'createdAt'],
        include: [{ model: User, attributes: ['username'] }]
        }] 
                
    });
    const post = postData.get({ plain: true });
    console.log(post);
    res.render('postComment',
      {post})
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

router.get('/newpost', async (req, res) => {
  try {
    console.log(req.session.user.id);
    res.render('newPost', {});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});




module.exports = router;
