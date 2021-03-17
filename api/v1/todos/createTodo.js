const {
  generateSuccess,
  generateLog,
  generateError,
} = require("../../../helper/response");
const USER = require("../../../db/models/userInfo");
const uniqueString = require("unique-string");
module.exports = async (req, res) => {
  const userId = req.app.locals.userId;
  const text = req.body.text;
  let todoId = uniqueString();
  try {
    await USER.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          todos: { todoId, text },
        },
      }
    );
    res.send(generateSuccess("Todo created!"));
  } catch (e) {
    console.error(e.message);
    res.send(generateError(e.message));
  }
};
