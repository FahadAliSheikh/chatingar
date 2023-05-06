const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, gender, age, country } = req.body;
  if (!name || !email || !password || !gender || !age || !country) {
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
    hasEmail: true,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
      hasEmail: user.hasEmail,
    });
  } else {
    throw new Error("Failed to create new user!");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(req.body);
  console.log(user);
  if (!user) {
    throw new Error("Invalid email or password!");
  }
  const matchpsd = await user.matchPassword(password);
  console.log(matchpsd);
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
      hasEmail: user.email,
    });
  } else {
    throw new Error("Invalid email or password!");
  }
});

//api/user? search=fahad
const allUsers = asyncHandler(async (req, res) => {
  // const keyword = req.query.search;
  // console.log(keyword);
  let name = req.query.name;
  let gender = req.query.gender;
  let country = req.query.country;
  let searchObje = {
    // isActive: true,
  };
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

const registerWOEmail = asyncHandler(async (req, res) => {
  const { name, password, gender, age, country } = req.body;
  if (!name || !gender || !age || !country) {
    res.status(400);
    throw new Error("Please enter all the fields!");
  }
  // const userExist = await User.findOne({ email });
  // if (userExist) {
  //   res.status(400);
  //   throw new Error("User already exists!");
  // }
  const user = await User.create({
    name,
    password: "password123!",
    gender,
    age,
    country,
    hasEmail: false,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
      hasEmail: user.hasEmail,
    });
  } else {
    throw new Error("Failed to create new user!");
  }
});
const updateActiveStatue = asyncHandler(async (userId, status) => {
  try {
    const foundUser = await User.findByIdAndUpdate(userId, {
      isActive: status,
    });
    if (foundUser) {
      console.log("user updated", foundUser.isActive);
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = {
  registerUser,
  registerWOEmail,
  authUser,
  allUsers,
  updateActiveStatue,
};
