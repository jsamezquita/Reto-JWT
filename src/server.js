const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./config/db.config");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role
const uri = "mongodb+srv://monitoring_user:monitoring_user@progweb.l4wva.mongodb.net/ProgWeb?retryWrites=true&w=majority";

db.mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Conexión a MongoDB exitosa");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Hola mundo" });
});

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "usuario"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("rol 'usuario' añadido a la colección");
      });

      new Role({
        name: "moderador"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("rol 'moderador' añadido a la colección");
      });

      new Role({
        name: "administrador"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'administrador' to roles collection");
      });
    }
  });
}