const userModel = require("../models/user.models.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blackList.model.js")
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

res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000
});

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
        }).select("+password");

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

        res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000
});

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

async function getMe(req, res) {
    try {
        const user = await userModel
            .findById(req.user.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            message: "User fetched successfully",
            user,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

async function logoutUser(req,res){
    const token = req.cookies.token

    res.clearCookie("token")
    await blacklistModel.create({
        token
    })

    res.status(200).json({
        message:"Logout successfully"
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    logoutUser
};