const router = require('express').Router();
const { Post } = require('../../../models');

router.post('/', async (req, res) => {
  try {
    const postData = await Post.create({
      title : req.body.title,
      comment : req.body.comment,
      userId: req.session.user.id
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
