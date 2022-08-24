const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth.js');

// get all comments
router.get('/', (req, res) => {
  Comments.findAll({
    attributes: ['id', 'comment_text', 'user_id', 'post_id']
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

// new comment
router.post('/', withAuth, (req, res) => {
  // check session
  // should only be req.session (not .loggedIn)
  if (req.session) {
    Comments.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
    }
});

router.delete('/:id', withAuth, (req, res) => {
  Comments.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id'})
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;