const { checkSchema } = require("express-validator");

module.exports = {
  register: checkSchema({
    name: {
      trim: true,
      in: ["body"],
      errorMessage: "Name length must be between 2 and 50 characters",
      isLength: {
        options: { min: 3, max: 50 },
      },
    },
    email: {
      trim: true,
      in: ["body"],
      errorMessage: "Email invalid",
      isEmail: true,
      normalizeEmail: true,
    },
    password: {
      isLength: {
        options: { min: 8, max: 50 },
      },
      in: ["body"],
      errorMessage: "Password length must be between 8 and 50 characters",
    },
  }),
  login: checkSchema({
    email: {
      trim: true,
      in: ["body"],
      errorMessage: "Email invalid",
      isEmail: true,
      normalizeEmail: true,
    },
    password: {
      isLength: {
        options: { min: 8, max: 50 },
      },
      in: ["body"],
      errorMessage: "Password length must be between 8 and 50 characters",
    },
  }),
};
