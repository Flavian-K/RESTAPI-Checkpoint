// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Database connected successfully"))
	.catch((err) => console.log("Database connection error:", err));

// Import User model
const User = require("./models/User");

// GET: Return all users
app.get("/users", async (req, res) => {
	try {
		const users = await User.find(); // Find all users
		res.status(200).json(users); // Return users in response
	} catch (error) {
		res.status(500).json({ message: "Error retrieving users" });
	}
});

// POST: Add a new user to the database
app.post("/users", async (req, res) => {
	const newUser = new User(req.body); // Create new user with request data
	try {
		await newUser.save(); // Save the user to the database
		res.status(201).json(newUser); // Return saved user in response
	} catch (error) {
		res.status(500).json({ message: "Error adding user" });
	}
});

// PUT: Edit a user by ID
app.put("/users/:id", async (req, res) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		}); // Update user
		res.status(200).json(updatedUser); // Return updated user in response
	} catch (error) {
		res.status(500).json({ message: "Error updating user" });
	}
});

// DELETE: Remove a user by ID
app.delete("/users/:id", async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id); // Delete user by ID
		res.status(204).send(); // Send empty response for successful delete
	} catch (error) {
		res.status(500).json({ message: "Error deleting user" });
	}
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
