const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name:{
		type: String,
		require: true
	},
	surname:{
		type: String,
		require: true,
	},
	email:{
		type: String,
		require: true,
	},
	password:{
		type: String,
		require: true,
	},
	avatar:{
		type: String,
		require: true,
	},
	bio:{
		type: String,
		require: true,
	},
	age:{
		type: Number,
		require: true,
	},
	gender:{
		type: String,
		require: true,
	}
},
{timestamps:true}
);

module.exports = mongoose.model("User", userSchema);