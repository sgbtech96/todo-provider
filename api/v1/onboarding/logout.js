const USER = require("../../../db/models/userInfo");
const {
  generateSuccess,
  generateLog,
  generateError,
} = require("../../../helper/response");

module.exports = async (req, res) => {
  const { userId, token } = req.app.locals;
  try {
    await USER.findOneAndUpdate(
      { _id: userId },
      {
        $pull: {
          tokens: token,
        },
      }
    );
    res.send(generateSuccess("Logged out!"));
  } catch (e) {
    console.error(e.message);
    res.send(generateError(e.message));
    return;
  }
};
