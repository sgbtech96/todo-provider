const {
  generateSuccess,
  generateLog,
  generateError,
} = require("../../../helper/response");
const USER = require("../../../db/models/userInfo");
module.exports = async (req, res) => {
  const userId = req.app.locals.userId;
  try {
    const { todos } = await USER.findOne({ _id: userId }).select("todos -_id");
    res.send(generateSuccess(todos));
  } catch (e) {
    console.error(e.message);
    res.send(generateError(e));
  }
};
