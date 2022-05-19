const { Op } = require("sequelize");
const UUID = require("uuid-v4");

const User = require("../models/user");
const List = require("../models/list");
const ListTask = require("../models/list_tasks");
const Tag = require("../models/tag");

const getAction = async (req, res) => {
  const { token, shared } = req.query;

  if (shared === "true") {
    await User.findOne({
      where: {
        token,
      },
    })
      .then(async (result) => {
        await List.findAll({
          where: {
            shared: true,
          },
          order: [["id", "DESC"]],

          include: [
            {
              model: User,
              attributes: ["displayName", "email"],
            },
            {
              model: ListTask,

              attributes: ["id", "tarefa", "status", "tempo_limite"],
              include: [
                {
                  model: Tag,
                  attributes: ["tag"],
                  through: {
                    attributes: [],
                  },
                },
              ],
            },
          ],
        })
          .then((result) => {
            res.status(200).json({ message: "All lists shared", data: result });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ message: err });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  } else
    await User.findOne({
      where: {
        token,
      },
    })
      .then(async (result) => {
        await List.findAll({
          where: {
            userId: result.dataValues.id,
          },
          order: [["id", "DESC"]],

          include: [
            {
              model: User,
              attributes: ["displayName", "email"],
            },
            {
              model: ListTask,

              attributes: ["id", "tarefa", "status", "tempo_limite"],
              include: [
                {
                  model: Tag,
                  attributes: ["tag"],
                  through: {
                    attributes: [],
                  },
                },
              ],
            },
          ],
        })
          .then((result) => {
            res
              .status(200)
              .json({ message: "All lists for user", data: result });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ message: err });
          });
      })
      .catch((err) => {
        console.log(err);
      });
};

const addAction = async (req, res) => {
  await User.findOne({
    where: {
      token: req.body.token,
    },
  })
    .then(async (result) => {
      const user = result.dataValues;
      if (user) {
        await List.create({
          userId: user.id,
          name: req.body.name,
          shared: req.body.shared,
        })
          .then(async (result) => {
            res.status(200).json({ message: "List created", data: result });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ message: err });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err });
    });
};

const deleteAction = async (req, res) => {
  await List.destroy({
    where: {
      id: req.body.id,
    },
  })
    .then((result) => {
      res.status(200).json({ message: "List and tasks deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err });
    });
};

const editAction = async (req, res) => {
  await List.update(
    {
      name: req.body.name,
      shared: req.body.shared,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  )
    .then((result) => {
      res.status(200).json({ message: "List edited" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err });
    });
};

module.exports = {
  getAction,
  addAction,
  deleteAction,
  editAction,
};
