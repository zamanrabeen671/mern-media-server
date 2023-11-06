const { addComment , getCommentById, getReactionById} = require("../controller/commentController");
const verifyToken = require("../helper/verifyToken");

const commentRouter = require("express").Router();

commentRouter.post("/add",  addComment);
commentRouter.post('/getCommentbyUser', getCommentById)

module.exports = commentRouter;
