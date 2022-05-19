const { checkSchema } = require("express-validator");

module.exports = {
  editAction: checkSchema({
    token: {
      notEmpty: true,
      in: ["query"],
    },
    name: {
      optional: true,
      trim: true,
      in: ["body"],
      errorMessage: "Name length must be between 2 and 50 characters",
      isLength: {
        options: { min: 3, max: 50 },
      },
    },
    email: {
      optional: true,
      trim: true,
      in: ["body"],
      errorMessage: "Email invalid",
      isEmail: true,
      normalizeEmail: true,
    },
    password: {
      optional: true,
      isLength: {
        options: { min: 8, max: 50 },
      },
      in: ["body"],
      errorMessage: "Password length must be between 8 and 50 characters",
    },
    stateId: {
      optional: true,
      in: ["body"],
      errorMessage: "State invalid",
      isInt: true,
    },
  }),
};
