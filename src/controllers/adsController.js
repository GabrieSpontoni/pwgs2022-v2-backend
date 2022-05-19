const { Op } = require("sequelize");
const UUID = require("uuid-v4");

// const Category = require("../models/category");
// const Ad = require("../models/ad");
const User = require("../models/user");
// const State = require("../models/state");
// const AdAttachment = require("../models/ad_attachments");

const getCategories = async (req, res) => {
  await Category.findAll()
    .then((result) => {
      res.status(200).json({ message: "All categories", data: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err });
    });
};

const addAction = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.multiples = true;

  form.parse(req, async (err, fields, files) => {
    const {
      title,
      description,
      price,
      categoryId,
      token,
      stateId,
      priceNegotiable,
    } = fields;

    if (!title || !categoryId) {
      res.status(400).json({ message: "Title and category are required" });
      return;
    } else if (!files["images"] || Array.from(files["images"]).length === 0) {
      res.status(400).json({
        message: "min photos amount : 2",
      });
      return;
    }

    const user = await User.findOne({
      where: {
        token,
      },
    });

    if (user) {
      const promises = [];
      let uuid = UUID();

      files["images"].forEach((file) => {
        promises.push(
          new Promise(async (resolve, reject) => {
            await firebase
              .storage()
              .bucket()
              .upload(file.path, {
                contentType: file.type,
                destination: `fotos/${file.name}`,
                metadata: {
                  metadata: {
                    firebaseStorageDownloadTokens: uuid,
                  },
                },
              })
              .then((result) => {
                const downloadUrl =
                  "https://firebasestorage.googleapis.com/v0/b/projeto-test-functions.appspot.com/o/" +
                  encodeURIComponent(result[0].name) +
                  "?alt=media&token=" +
                  uuid;

                resolve({ fileInfo: result[0].metadata, downloadUrl });
              })
              .catch((err) => {
                reject(err);
              });
          })
        );
      });

      const images = await Promise.all(promises);

      await Ad.create({
        userId: user.dataValues.id,
        stateId,
        categoryId,
        images,
        title,
        price,
        priceNegotiable,
        description,
      })
        .then(async (result) => {
          images.forEach(async (image) => {
            await AdAttachment.create({
              adId: result.dataValues.id,
              image: image.downloadUrl,
            })
              .then(async (result) => {})
              .catch((err) => {
                console.log(err);
              });
          });
          res.status(200).json({ message: "Ad created" });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ message: err });
        });
    }
  });
};

const getList = async (req, res) => {
  const {
    sort = "asc",
    offset = 0,
    limit = 8,
    q,
    categoryId,
    state,
  } = req.query;

  let stateId;

  if (state) {
    await State.findOne({
      where: {
        name: state.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
          letter.toUpperCase()
        ),
      },
    })
      .then((result) => {
        if (result) {
          stateId = result.dataValues.id;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  await Ad.findAll({
    where: {
      status: "true",
      title: q ? { [Op.like]: `%${q}%` } : { [Op.ne]: null },
      categoryId: categoryId ? categoryId : { [Op.ne]: null },
      stateId: stateId ? stateId : { [Op.ne]: null },
    },
    order: [["id", sort]],
    offset: parseInt(offset),
    limit: parseInt(limit),

    include: [
      {
        model: User,
        attributes: ["name", "email"],
      },
      {
        model: State,
        attributes: ["name"],
      },
      {
        model: Category,
        attributes: ["name", "slug"],
      },
      {
        model: AdAttachment,
        attributes: ["image"],
      },
    ],
  })
    .then((result) => {
      res.status(200).json({ message: "All ads", data: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err });
    });
};

module.exports = {
  getCategories,
  addAction,
  getList,
};
