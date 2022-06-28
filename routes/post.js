const express = require("express")
const router = express.Router();
const Post = require('../models/Post');


// პოსტის შექმნა

router.post("/create", async (req, res) => {
	try {
		if(req.body.title !== undefined && req.body.content !== undefined && req.body.user_id !== undefined) {
			const newPost = await new Post(
				{
					title: req.body.title, 
					content: req.body.content, 
					user_id: req.body.user_id, 
					category: req.body.category, 
					image: req.body.image

				}
			)
			const post = await newPost.save();
			return res.status(200).json(post);
		} else {
			return res.status(400).json("აუცილებელია მონაცემების მოწოდება");
		}
	} catch(err) {
		res.status(400).json(err);
	}
})

// პოსტის განახლება

router.post("/update/:id", async (req, res) => {
	try {
		await Post.updateOne({_id: req.params.id}, { $set: req.body });
		return res.status(200).json("პოსტი წარმატებით განახლდა");
	} catch(err) {
		return res.status(400).json("პოსტი ვერ განახლდა");
	}
})


// პოსტის წაშლა

router.post("/delete/:id", async (req, res) => {
	try {
		await Post.findByIdAndRemove({_id: req.params.id});
		return res.status(200).json("პოსტი წარმატებით წაიშალა");
	} catch(err) {
		return res.status(400).json("პოსტი ვერ წაიშალა");
	}
})

// ერთი პოსტის მიღება

router.get("/single/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id).populate('user_id')
		res.status(200).json(post);
	} catch(err) {
		res.status(400).json("პოსტის მოძებნა ვერ მოხერხდა");
	}
})

// ყველა პოსტის მიღება

router.get("/all/", async (req, res) => {
	try {
		const posts = await Post.find({}).populate('user_id')
		res.status(200).json(posts);
	} catch(err) {
		res.status(400).json("პოსტები ვერ მოიძებნა");
	}
})



module.exports = router;