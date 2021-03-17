const {
  generateSuccess,
  generateLog,
  generateError,
} = require("../../../helper/response");
const USER = require("../../../db/models/userInfo");
module.exports = async (req, res) => {
  const userId = req.app.locals.userId;
  try {
    const user = await USER.findOne({ _id: userId }).select(
      "givenName photoUrl -_id"
    );
    res.send(generateSuccess(user));
  } catch (e) {
    console.error(e.message);
    res.send(generateError(e));
  }
};
