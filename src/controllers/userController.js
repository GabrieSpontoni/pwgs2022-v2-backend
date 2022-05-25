const { validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcrypt");

const User = require("../models/user");

const info = async (req, res) => {
  const { token } = req.query;
  await User.findOne({
    where: {
      token,
    },
    attributes: ["id", "displayName", "email"],
  })
    .then((result) => {
      res.status(200).json({ message: "User info", data: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err });
    });
};

const editAction = async (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req);
  console.log(data);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  await User.update(
    {
      name: data.name,
      email: data.email,
      stateId: data.stateId,
      passwordHash: data.password,
    },
    {
      where: {
        token: data.token,
      },
    }
  )
    .then(() => {
      res.status(200).json({ message: "User updated successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err });
    });
};

module.exports = {
  info,
  editAction,
};
