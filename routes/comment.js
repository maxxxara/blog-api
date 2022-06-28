const express = require("express")
const router = express.Router();
const Comment = require('../models/Comment');


router.post("/create", async (req, res) => {
	try {
		if (req.body.content !== undefined && req.body.user_id !== undefined && req.body.post_id !== undefined) {
			const newComment = await new Comment(
				{
					content: req.body.content,
					user_id: req.body.user_id,
					post_id: req.body.post_id
				}
			)
			const comment = await newComment.save();
			return res.status(200).json(comment);
		} else {
			res.status(400).json("აუცილებელია მონაცემების შეყვანა.");
		}
		
	} catch(err) {
		res.status(400).json(err);
	}
})


router.post("/delete/:id", async (req, res) => {
	try {
		await Comment.findByIdAndRemove({_id: req.params.id});
		return res.status(200).json("კომენტარი წარმატებით წაიშალა");
	} catch(err) {
		return res.status(400).json("კომენტარი ვერ წაიშალა");
	}
})


router.get("/all/:id", async (req, res) => {
	try {
		const posts = await Comment.find({ post_id: req.params.id }).populate('user_id')
		res.status(200).json(posts);
	} catch(err) {
		res.status(400).json("პოსტები ვერ მოიძებნა");
	}
})




module.exports = router;