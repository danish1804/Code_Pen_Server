import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let decodedData;

    if (token) {
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id;
    }
    next();
  } catch (error) {
    res.json({ message: "Authentication Failed." });
  }
};

export default auth;
