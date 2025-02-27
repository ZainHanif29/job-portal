import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register
export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message:
          "This email is already registered. Please use a different email.",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashPassword,
      role,
    });
    return res.status(201).json({
      success: true,
      message: "Your account has been created successfully!",
    });
  } catch (error) {
    console.log(`Internal Server Error in Register API: ${error} `);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error in Register API: ${error} `,
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    //   Email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No account found with this email.",
      });
    }
    //   Password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password.",
      });
    }
    //   Role
    if (role !== user.role) {
      return res.status(400).json({
        success: false,
        message: "Account doesn't exist with current roles.",
      });
    }
    //   Token
    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        user,
        success: true,
        message: `Account login successfully: ${user.fullName}`,
      });
  } catch (error) {
    console.log(`Internal Server Error in Login API: ${error} `);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error in Login API: ${error} `,
    });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ success: true, message: "Logout Successfully" });
  } catch (error) {
    console.log(`Internal Server Error in Logout API: ${error} `);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error in Logout API: ${error} `,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found." });
    }

    let skillsArray;
    if (skills) skillsArray = skills.split(",");

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    await user.save();

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res.status(200).json({
      user,
      success: true,
      message: `Profile updated successfully.`,
    });
  } catch (error) {
    console.log(`Internal Server Error in Update-Profile API: ${error} `);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error in Update-Profile API: ${error} `,
    });
  }
};
