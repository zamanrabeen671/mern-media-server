const Auth = require("../model/authModel");
const Post = require("../model/post");

const createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const data = await newPost.save();
    return res.status(200).json({
      message: "posted successfully",
      status: "success",
      data,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      status: "Failed",
    });
  }
};

/**
 * get all course
 */

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate('addedby').exec();
    return res.status(200).json({
      message: "successfull",
      status: "success",
      total: posts.length,
      posts,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      status: "Failed",
    });
  }
};
const getTopPosts = async (req, res) => {
  try {
    const post = await Post.find({}).limit(4).sort({ createdAt: -1 }).exec();
    return res.status(200).json({
      message: "successfull",
      status: "success",
      total: post.length,
      post,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      status: "Failed",
    });
  }
};
// get all coures by teacher id
const getTopContributor = async (req, res) => {
  try {
    const contributors = await Post.aggregate([
      {
        $group: {
          _id: '$addedby',
          postCount: { $sum: 1 },
        },
      },
      {
        $sort: { postCount: -1 },
      },
      {
        $limit: 3, // Limit to the top 3 contributors
      },
    ]);

    if (contributors.length > 0) {
      const userIds = contributors.map(contributor => contributor._id);

      const users = await Auth.find({ _id: { $in: userIds } });

      return res.status(200).json({
        message: 'Successful',
        status: 'success',
        total: users.length,
        users: users,
      });
    } else {
      return res.status(200).json({
        message: 'Successful',
        status: 'no top contributors found',
        users: [],
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: 'Internal Server Error',
      status: 'error',
      error: err.message,
    });
  }
};

const getPostById = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.find({ _id: id }).populate('addedby').exec();;
    return res.status(200).json({
      message: "successfull",
      status: "success",
      total: post.length,
      post: post[0],
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      status: "Failed",
    });
  }
};
module.exports = { createPost, getAllPosts, getPostById, getTopPosts, getTopContributor };
