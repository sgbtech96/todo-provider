const mongoose = require("mongoose");
const schema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  givenName: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    default: null,
  },
  tokens: {
    type: [String],
    default: [],
  },
  todos: {
    type: Array,
    default: [],
  },
});
const USER = mongoose.model("User", schema);
module.exports = USER;
