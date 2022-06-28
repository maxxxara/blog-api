const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	content:{
		type: String,
		require: true
	},
	user_id:{
		type: mongoose.Schema.Types.ObjectId, ref: "User",
		require: true
	},
	post_id:{
		type: mongoose.Schema.Types.ObjectId, ref: "Post",
		require: true
	}
	
},
{timestamps:true}
);

module.exports = mongoose.model("Comment", commentSchema);