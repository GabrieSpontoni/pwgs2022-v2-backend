const app = require("./src/app");

app.listen(process.env.PORT || 3001, () => {
  console.log(`server running http://localhost:${process.env.PORT || 3001}`);
});
