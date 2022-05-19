const User = require("../models/user");

module.exports = {
  privateRoute: async (req, res, next) => {
    if (!req.query.token && !req.body.token) {
      return res.status(401).json({
        message: "Token not provided",
      });
    }

    let token = req.query.token || req.body.token;

    const user = await User.findOne({
      where: {
        token,
      },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    next();
  },
};
