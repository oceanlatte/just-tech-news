const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Vote, Comments } = require('../../models');
const withAuth = require('../../utils/auth.js');

// get all posts
router.get('/', (req, res) => {
  console.log('===================');
  Post.findAll({
    attributes: [
      'id', 
      'post_url', 
      'title', 
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: Comments,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbPostData => res.json(dbPostData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// get one post
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id', 
      'post_url', 
      'title', 
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id'});
      return;
    }
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// update a post
router.post('/', withAuth, (req, res) => {
  // expects {title: 'sample', post_url: 'https://sample.com', user_id: 1}
  Post.create({
    title: req.body.title,
    post_url: req.body.post_url,
    user_id: req.session.user_id
  })
  .then(dbPostData => res.json(dbPostData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// PUT api/posts/upvote
router.put('/upvote', withAuth, (req, res) => {
  // make sure session exists first
  // supposed to be only req.session (not .loggedIn)
  if (req.session) {
    // pass session id along with all destructured properties on req.body
    Post.upvote({...req.body, user_id: req.session.user_id}, { Vote, Comments, User })
      .then(updatedVoteData => res.json(updatedVoteData))
      .catch(err => {
        console.log(err)
        res.status(500).json(err);
      });
  }
  // pass in both the user's id and post's id with req.body
});

router.put('/:id', withAuth, (req, res) => {
  Post.update(
    {
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id'});
      return;
    }
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// delete a post
router.delete('/:id', withAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id'});
      return;
    }
    res.json(dbPostData);
  })
  .catch(err => { 
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;