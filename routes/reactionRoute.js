const { addReaction , getReactionById} = require("../controller/reactionController");
const verifyToken = require("../helper/verifyToken");

const commentRouter = require("express").Router();

commentRouter.post("/add",  addReaction);
commentRouter.post('/getReactionById', getReactionById)


module.exports = commentRouter;
