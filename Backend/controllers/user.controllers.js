const jwt = require("jsonwebtoken");
const db = require("../db/db.js");
const bcrypt = require("bcrypt")

const createUser = async (req, res) => {
  try {
    const { fullName, email, DOB, password, gender } = req.body;
    const hashedPassword = await bcrypt.hash(password, 16);
    const insertion = await db("users").insert({
      fullName,
      email,
      DOB,
      password:hashedPassword,
      gender,
    });
    if (insertion) {
      res.json({ message: "User Created Successfully" });
    }
  } catch (error) {
    console.error(error);
    res.json({ message: "Some internal error occurred" });
  }
};

const loginUser = async (req, res) => {
  try {
    const {  fullName, password } = req.body;
    if (! fullName || !password) {
      res.json({ message: "username or password is invalid" });
    }
    const user = await db("users").where({ fullName }).first();
    if (!user) {
      res.json({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (user && passwordMatch) {
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.SECRET_KEY,
        { expiresIn: "5h" }
      );
      res.json({ message: "Login In succesfully", token });
    } else {
      res.json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error(error);
    res.json({ message: "Some Internal Error Occurred" });
  }
};

const logoutUser = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    res.json("invalid authoriztion");
  }
  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      console.error(error);
      res.status(404).json({ message: "invalid token" });
    }
    res.json({ message: "logout sucessfull" });
  });
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
};
