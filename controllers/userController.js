const User = require('../models/userModel');

// @desc      Get User
// @routes    GET /api/v1/users
// @access    Private
const getUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({ message: 'Get user successfull', data: user });
  } catch (error) {
    throw new Error(error);
  }
};

// @desc      Set User
// @routes    POST /api/v1/users
// @access    Private
const setUser = async (req, res) => {
  try {
    if (
      !(
        req.body.firstName &&
        req.body.lastName &&
        req.body.email &&
        req.body.age
      )
    ) {
      throw new Error('Please fill all the fields');
    }
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      age: req.body.age,
    });
    if (req.body.email === User.find(req.body.email)) {
      throw new Error('Email must be unique');
    }
    res.status(201).json({ message: 'User Create Success', data: user });
  } catch (error) {
    throw new Error(error);
  }
};

// @desc      Update User
// @routes    PUT /api/v1/users/id
// @access    Private
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(400);
      throw new Error('User not found!');
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: `Update user for ${req.params.id}`, data: updatedUser });
  } catch (error) {
    throw new Error(error);
  }
};

// @desc      Delete User
// @routes    DELETE /api/v1/users/id
// @access    Private
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(400);
      throw new Error('User not found!');
    }
    await User.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: `Delete user for ${req.params.id}` });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getUser,
  setUser,
  updateUser,
  deleteUser,
};
