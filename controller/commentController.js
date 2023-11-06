
const CommentReaction = require("../model/commentModel")

const addComment = async (req, res) => {
    try {
        const newComment = await CommentReaction(req.body);
        const data = await newComment.save();
        return res.status(201).json({
            message: "comment created successfully",
            status: "success",
            data,
            // courseData
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            status: "Failed",
        });
    }

}

const getCommentById = async (req, res) => {
    const { user, post } = req.body;

    try {
        const response = await CommentReaction.find({
            $and: [
                // { user: user },
                { post: post },
            ]
        }).populate('user').exec()
        res.status(200).json({
            message: 'comment founded',
            status: 'success',
            total: response.length,
            response
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
            status: 'failed'
        })
    }
}

// const getEnrollCourses = async(req, res) => {
//     try {
//         const response = await Enroll.find()
//         res.status(200).json({
//             message: 'course founded',
//             status: 'success',
//             total: response.length,
//             response
//         })
//     }
//     catch(err) {
//         res.status(500).json({
//            message: err.message,
//            status: 'failed'
//         })
//     }
// }
module.exports = { addComment, getCommentById}