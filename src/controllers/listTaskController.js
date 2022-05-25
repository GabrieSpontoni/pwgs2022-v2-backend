const User = require("../models/user");
const List = require("../models/list");
const ListTask = require("../models/list_tasks");
const ListTaskTag = require("../models/list_tasks_tags");

const getAction = async (req, res) => {
  const { token } = req.query;

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
        ],
      })
        .then((result) => {
          res.status(200).json({ message: "All list", data: result });
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

  await User.findOne({
    where: {
      token: req.body.token,
    },
  })
    .then(async (result) => {
      const user = result.dataValues;
      if (user) {
        await ListTask.create({
          listId: req.body.listId,
          status: req.body.status,
          tarefa: req.body.tarefa,
          tempo_limite: req.body.tempo_limite,
        })
          .then(async (result) => {
            tags.forEach(async (tag, index) => {
              await ListTaskTag.create({
                listTaskId: result.dataValues.id,
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
                  console.log(err);
                  if (index === tags.length - 1) {
                    res.status(500).json({ message: err });
                  }
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
  await ListTask.destroy({
    where: {
      id: req.body.id,
    },
  })
    .then(() => {
      res.status(200).json({ message: "Task deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err });
    });
};

const editAction = async (req, res) => {
  await ListTaskTag.destroy({
    where: {
      listTaskId: req.body.id,
    },
  }).then(async () => {
    const { tags } = req.body;
    tags.forEach(async (tag, index) => {
      await ListTaskTag.create({
        listTaskId: req.body.id,
        tagId: tag,
      })
        .then(async () => {
          if (index === tags.length - 1) {
            await ListTask.update(
              {
                status: req.body.status,
                tarefa: req.body.tarefa,
                tempo_limite: req.body.tempo_limite,
              },
              {
                where: {
                  id: req.body.id,
                },
              }
            )
              .then(() => {
                res.status(200).json({ message: "Task of list edited" });
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
