const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please fill the first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please fill the last name'],
    },
    email: {
      type: String,
      required: [true, 'Please fill the email'],
      unique: true,
    },
    age: {
      type: Number,
      required: [true, 'Please fill the age'],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', userSchema);
