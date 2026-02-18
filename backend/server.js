const tareasRoutes = require("./routes/tareas.routes");
const db = require("./database");
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/tareas", tareasRoutes);

// Puerto
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
