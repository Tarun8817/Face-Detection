const userModel = require("../models/user.models.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;

        const isAlreadyRegistered = await userModel.findOne({
            $or: [{ email }, { username }],
        });

        if (isAlreadyRegistered) {
            return res.status(400).json({
                message: "User with same email or username already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "3d",
            }
        );

        res.cookie("token", token);

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            token,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password, username } = req.body;

        const user = await userModel.findOne({
            $or: [{ email }, { username }],
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "3d",
            }
        );

        res.cookie("token", token);

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            token,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

module.exports = {
    registerUser,
    loginUser,
};