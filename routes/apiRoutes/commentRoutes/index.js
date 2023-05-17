const router = require('express').Router();
const { Comment } = require('../../../models');

router.post('/', async (req, res) => {
  try {
    const commentData = await Comment.create({
      content: req.body.comment,
      postId: req.body.id,
      userId: req.session.user.id
    });
    res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



module.exports = router;