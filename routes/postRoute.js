const {
  createPost,
  getAllPosts,
  getPostById,
  getTopPosts,
  getTopContributor
} = require("../controller/postController");
const verifyToken = require("../helper/verifyToken");

const postRouter = require("express").Router();
/**
 * To create a course a teacher must be
 * logged in
 * token must be sent by the header with Authorization key
 * example: 
 
  headers: {
    'Authorization': token,
    'content-type': 'text/json'
  }

 */
postRouter.post("/create", createPost);

// public routes
postRouter.get("/",  getAllPosts);
postRouter.get('/topPost', getTopPosts);
postRouter.get('/topContributor', getTopContributor)
// public routes
postRouter.get("/:id", getPostById);

module.exports = postRouter;
