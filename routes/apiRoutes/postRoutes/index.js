const router = require('express').Router();
const { Post } = require('../../../models');

router.post('/', async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.session.user.id
    });
    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.put('/', async (req, res) => {
  try {
    const postData = await Post.update(
      {
        comment: req.body.comment
      },
      {
        where: {
          id: parseInt(req.body.id)
        }
      }
    );
    console.log(postData, req.body.id, req.body.comment);
    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
