const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const User = require("../models/User");
const Recycle = require("../models/Recycle");

// authentication middleware
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Verification Error (May be you are Logged out)" });
  }
};

// rendering all pages
router.get("", async (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    console.log(error);
  }
});

router.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log(error);
  }
});

router.get("/register", async (req, res) => {
  try {
    res.render("register");
  } catch (error) {
    console.log(error);
  }
});

router.get("/recycle", authMiddleware, async (req, res) => {
  try {
    res.render("recycle");
  } catch (error) {
    console.log(error);
  }
});

router.get("/recycleTable", authMiddleware, async (req, res) => {
  try {
    // console.log(req.userId);
    const tableData = await Recycle.find({ userId: req.userId }); 

    if (!tableData || tableData.length === 0) {
      res.message("No data found");
    } else {
      console.log(tableData);
      res.render("recycleTable", { tableData });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/thanks", authMiddleware, async (req, res) => {
  try {
    res.render("thanks");
  } catch (error) {
    console.log(error);
  }
});

// user register form post api
router.post("/register", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    console.log(fullname, email, password);
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({
        fullname,
        email,
        password: hashedPassword,
      });
      if (!user) {
        return res.status(401).json({ message: "Failed to create user" });
      } else {
        return res.redirect("/login");
      }
    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json({ message: "User already in use" });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.log(error);
  }
});

// user login form post api
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/recycle");
  } catch (error) {
    console.log(error);
  }
});

router.post("/recycleForm", authMiddleware, async (req, res) => {
  const { name, address, place, category, quantity, amount } = req.body;

  try {
    const recycle = await Recycle.create({
      Name: name,
      Address: address,
      Place: place,
      Category: category,
      Quantity: quantity,
      Amount: amount,
      userId: req.userId,
    });

    if (!recycle) {
      return res.status(401).json({ message: "Failed to save" });
    } else {
      res.redirect("/thanks");
    }
  } catch (err) {
    console.log(error);
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = router;
