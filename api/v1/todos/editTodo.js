const {
  generateSuccess,
  generateLog,
  generateError,
} = require("../../../helper/response");
const USER = require("../../../db/models/userInfo");
module.exports = async (req, res) => {
  const userId = req.app.locals.userId;
  const todoId = req.params.todoId;
  const text = req.body.text;
  try {
    await USER.updateOne(
      { _id: userId, "todos.todoId": todoId },
      {
        $set: {
          "todos.$.text": text,
        },
      }
    );
    res.send(generateSuccess("Todo edited!"));
  } catch (e) {
    console.error(e.message);
    res.send(generateError(e.message));
  }
};
