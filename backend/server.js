const tareasRoutes = require("./routes/tareas.routes");
const habitsRoutes = require("./routes/habits.routes");
const db = require("./database");
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
//TAREAS
app.use("/tareas", tareasRoutes);
//HABITOS
app.use("/habits", habitsRoutes);

// Puerto
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
