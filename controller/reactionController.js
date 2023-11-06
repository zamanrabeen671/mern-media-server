
const Reaction = require("../model/reactionModel")

// const addReaction = async (req, res) => {
//     try {
//         const newComment = await Reaction(req.body);
//         const data = await newComment.save();
//         return res.status(201).json({
//             message: "comment created successfully",
//             status: "success",
//             data,
//             // courseData
//         });
//     } catch (err) {
//         return res.status(500).json({
//             message: err.message,
//             status: "Failed",
//         });
//     }


// }
const addReaction = async (req, res) => {
    try {
        const { user, post, reaction } = req.body;
        const filter = { user, post };
        const update = { user, post, reaction };
        const options = {
            upsert: true,
            new: true,
        }
        const savedReaction = await Reaction.findOneAndUpdate(filter, update, options);
        res.status(201).json(savedReaction);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'An error occurred' });
    }
}
const getReactionById = async (req, res) => {
    const { user, post } = req.body;

    try {
        const response = await Reaction.find({
            $and: [
                { user: user },
                // { post: post },
                { reaction: true }
            ]
        }).populate('user').exec()
        res.status(200).json({
            message: 'reaction founded',
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
module.exports = { addReaction, getReactionById }