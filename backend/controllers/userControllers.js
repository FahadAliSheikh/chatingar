const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, gender, age, country } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields!");
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists!");
  }
  const user = await User.create({
    name,
    email,
    password,
    gender,
    age,
    country,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("Failed to create new user!");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
      gender: user.gender,
      country: user.country,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("Invalid email or password!");
  }
});

//api/user? search=fahad
const allUsers = asyncHandler(async (req, res) => {
  // const keyword = req.query.search;
  // console.log(keyword);
  console.log(req.query);
  let name = req.query.name;
  let gender = req.query.gender;
  let country = req.query.country;
  let searchObje = {};
  if (req.query.name) {
    searchObje.name = { $regex: req.query.name, $options: "i" };
  }
  if (req.query.gender) {
    searchObje.gender = req.query.gender;
  }
  if (req.query.country) {
    searchObje.country = req.query.country;
  }

  console.log(searchObje);
  keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(searchObje).find({
    _id: { $ne: req.user._id },
  });
  res.send(users);
});
module.exports = {
  registerUser,
  authUser,
  allUsers,
};
