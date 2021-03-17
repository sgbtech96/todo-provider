const USER = require("../../../db/models/userInfo");
const {
  generateSuccess,
  generateLog,
  generateError,
} = require("../../../helper/response");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { OAuth2Client } = require("google-auth-library");

console.log(`${process.env.GOOGLE_ANDROID_CLIENT_ID}`);
const client = new OAuth2Client(`${process.env.GOOGLE_ANDROID_CLIENT_ID}`);

const ONE_YEAR = 60 * 60 * 24 * 30 * 12;

module.exports = async (req, res) => {
  const { idToken } = req.body;
  const credentials = await client.verifyIdToken({
    idToken,
    audience: `${process.env.GOOGLE_ANDROID_CLIENT_ID}`,
  });
  console.log(credentials);
  const { email_verified, email, given_name, picture } = credentials.payload;
  try {
    const user = await USER.findOne({ email });
    let userId = user?._id;
    if (!user) {
      const newUser = new USER({
        email,
        givenName: given_name,
        photoUrl: picture,
      });
      userId = newUser._id;
      await newUser.save();
    } else if (user.tokens.length > 2) {
      res.send(
        generateLog(
          "You've exceeded session limit, logout of atleast 1 device!"
        )
      );
      return;
    }
    const token = jwt.sign({ userId }, SECRET_KEY, {
      expiresIn: ONE_YEAR,
    });
    await USER.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          tokens: token,
        },
      }
    );
    res.send(generateSuccess({ token }));
  } catch (e) {
    console.error(e.message);
    res.send(generateError(e.message));
    return;
  }
};
