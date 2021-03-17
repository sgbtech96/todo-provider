const {
  generateSuccess,
  generateLog,
  generateError,
} = require("../../../helper/response");
const USER = require("../../../db/models/userInfo");
module.exports = async (req, res) => {
  const userId = req.app.locals.userId;
  const todoId = req.params.todoId;
  try {
    await USER.findOneAndUpdate(
      { _id: userId },
      {
        $pull: {
          todos: { todoId },
        },
      }
    );
    res.send(generateSuccess("Todo deleted!"));
  } catch (e) {
    console.error(e.message);
    res.send(generateError(e.message));
  }
};
