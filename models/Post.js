const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	title:{
		type: String,
		require: true
	},
	content:{
		type: String,
		require: true
	},
	likes:{
		type: Array,
		default: []
	},
	user_id:{
		type: mongoose.Schema.Types.ObjectId, ref: "User",
		require: true
	},
	category:{
		type: String,
		require: true
	},
	image:{
		type: String,
		require: true
	}
	
},
{timestamps:true}
);

module.exports = mongoose.model("Post", postSchema);