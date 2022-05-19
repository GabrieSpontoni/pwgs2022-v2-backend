const { Op } = require("sequelize");
const UUID = require("uuid-v4");

// const Ad = require("../models/ad");
const User = require("../models/user");
// const AdAttachment = require("../models/ad_attachments");
const IsolatedTask = require("../models/isolated_task");
const Tag = require("../models/tag");
const IsolatedTaskTag = require("../models/isolated_task_tag");

const getAction = async (req, res) => {
  const { token } = req.query;

  await User.findOne({
    where: {
      token,
    },
  })
    .then(async (result) => {
      await IsolatedTask.findAll({
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
            model: Tag,
            attributes: ["tag"],
            through: {
              attributes: [],
            },
          },
        ],
      })
        .then((result) => {
          res.status(200).json({ message: "All tasks", data: result });
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
  const { tags } = req.body;

  // res.status(200).json({ message: "All task", data: req.body });

  await User.findOne({
    where: {
      token: req.body.token,
    },
  })
    .then(async (result) => {
      const user = result.dataValues;
      if (user) {
        await IsolatedTask.create({
          userId: user.id,
          status: req.body.status,
          tarefa: req.body.tarefa,
          tempo_limite: req.body.tempo_limite,
        })
          .then((result) => {
            tags.forEach(async (tag, index) => {
              await IsolatedTaskTag.create({
                isolatedTaskId: result.dataValues.id,
                tagId: tag,
              })
                .then((result) => {
                  if (index === tags.length - 1) {
                    res
                      .status(200)
                      .json({ message: "Tags added", data: result });
                  }
                })
                .catch((err) => {
                  res.status(500).json({ message: err });
                });
            });
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
  await IsolatedTask.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      res.status(200).json({ message: "Task deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err });
    });
};

const editAction = async (req, res) => {
  await IsolatedTaskTag.destroy({
    where: {
      isolatedTaskId: req.params.id,
    },
  }).then(async (result) => {
    const { tags } = req.body;
    tags.forEach(async (tag, index) => {
      await IsolatedTaskTag.create({
        isolatedTaskId: req.params.id,
        tagId: tag,
      })
        .then(async (result) => {
          if (index === tags.length - 1) {
            // res.status(200).json({ message: "Tags added", data: result });
            await IsolatedTask.update(
              {
                status: req.body.status,
                tarefa: req.body.tarefa,
                tempo_limite: req.body.tempo_limite,
              },
              {
                where: {
                  id: req.params.id,
                },
              }
            )
              .then((result) => {
                res.status(200).json({ message: "Task edited" });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({ message: err });
              });
          }
        })
        .catch((err) => {
          res.status(500).json({ message: err });
        });
    });
  });
};

module.exports = {
  getAction,
  addAction,
  deleteAction,
  editAction,
};
