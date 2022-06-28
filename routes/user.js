const express = require("express")
const router = express.Router();
const User = require('../models/User');


// იუზერის შექმნა

router.post("/create", async (req, res) => {
	try {
		if (req.body.name !== undefined && req.body.email !== undefined && req.body.password !== undefined) {
			const newUser = await new User(
				{
					name: req.body.name,
					surname: req.body.surname,
					email: req.body.email,
					password: req.body.password,
					avatar: req.body.avatar,
					bio: req.body.bio,
					age: req.body.age,
					gender: req.body.gender
				}
			)
			const user = await newUser.save();
			return res.status(200).json(user);
		} else {
			res.status(400).json("აუცილებელია მონაცემების შეყვანა.");
		}
		
	} catch(err) {
		res.status(400).json(err);
	}
})


// იუზერის განახლება
router.post("/update/:id", async (req, res) => {
	try {
		await User.updateOne({_id: req.params.id}, { $set: req.body });
		return res.status(200).json("იუზერი წარმატებით განახლდა");
	} catch(err) {
		return res.status(400).json("იუზერი ვერ განახლდა");
	}
})


// იუზერის წაშლა
router.post("/delete/:id", async (req, res) => {
	try {
		await User.findByIdAndRemove({_id: req.params.id});
		return res.status(200).json("იუზერი წარმატებით წაიშალა");
	} catch(err) {
		return res.status(400).json("იუზერი ვერ წაიშალა");
	}
})

// იუზერის წამოღება
router.get("/single/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id)
		res.status(200).json(user);
	} catch(err) {
		res.status(400).json("იუზერის მოძებნა ვერ მოხერხდა");
	}
})

module.exports = router;