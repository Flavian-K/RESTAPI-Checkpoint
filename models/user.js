// Import mongoose
const mongoose = require("mongoose");

// Define the schema for a user
const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	age: { type: Number, required: true },
});

// Export the User model
module.exports = mongoose.model("User", userSchema);
