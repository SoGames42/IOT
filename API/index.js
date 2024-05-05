const express = require("express");
const routes = require("./routes/start");
const cors = require("cors");
const app = express();
const ip = require("ip");
const port = 3000;
const ipAddr = ip.address();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`Server run: http://${ipAddr}:${port}`);
});

// /users en GET = tous les utilisateurs
// /users en POST = créer un utilisiteur
// /users/:id en GET = un utilisateur
// /users/:id en PUT = modifier un utilisateur
// /users/:id en DELETE = supprimer un utilisateur
// allumer console = npm run dev
