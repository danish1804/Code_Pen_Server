import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET;

export const signup = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const oldUser = await User.findOne({ $or: [{ email }, { username }] });

    if (oldUser) return res.json({ message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      username,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {});

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (!oldUser) return res.json({ message: "User doesn't exist!" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.json({ message: "Invalid credentials." });

    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      secret,
      {}
    );

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// export const getUser = async (req, res) => {
//   const { username } = req.params;
//   try {
//     const user = await User.findOne({ username });
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(404).json({ message: "Cannot get user!" });
//   }
// };
