const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');
const Comments = require('./Comments');

// collecting and exporting model data


//create associations
User.hasMany(Post, { 
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

// connecting post and user models THROUGH vote model
// when a post is queried we can see totale votes a user creates
// when a user is queried we can see all the posts they've voted on
User.belongsToMany(Post, { // user belongs to many posts
  through: Vote, // going through the Vote table
  as: 'voted_posts', // display the shared column as 'new name'
  foreignKey: 'user_id' // declare foreign key
});

// same as above 
Post.belongsToMany(User, {
  through: Vote, // connecting through a whole different table
  as: 'voted_posts',
  // because the user_id and post_id pairings are unique, it's protected from 
  // the possibility of a singe user voting on one post multiple times
  // this is called a forgein key contratint
  foreignKey: 'post_id' // aligns the fields set up in the model
});


// --- one to many associations ---
Vote.belongsTo(User, {
  foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Vote, {
  foreignKey: 'user_id'
});

Post.hasMany(Vote, {
  foreignKey: 'post_id'
});

// -----Comments Associations-------
Comments.belongsTo(User, {
  foreignKey: 'user_id'
});
Comments.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Comments, {
  foreignKey: 'user_id'
});

Post.hasMany(Comments, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Vote, Comments };