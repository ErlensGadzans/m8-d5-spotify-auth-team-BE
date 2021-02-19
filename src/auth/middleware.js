const { verifyJWT } = require("../auth/index");
const UserModel = require("../users/schema");

const authorize = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(token);
    const decoded = await verifyJWT(token);
    console.log(decoded);
    const user = await UserModel.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
  } catch (error) {
    const err = new Error("Please authenticate");
    next(error);
  }
};

module.exports = { authorize };
