require("dotenv").config();
const tareasRoutes = require("./routes/tareas.routes");
const habitsRoutes = require("./routes/habits.routes");
const habitLogsRoutes = require("./routes/habitLogs.routes");
const usersRoutes = require("./routes/users.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const db = require("./database");
const express = require("express");
const cors = require("cors");

require("./jobs");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
//TAREAS
app.use("/tareas", tareasRoutes);
//HABITOS
app.use("/habits", habitsRoutes);
//METRICAS Y ESTADISTICAS
app.use("/habits", habitLogsRoutes);
//USUARIOS
app.use("/users", usersRoutes);
//CONTADOR
app.use("/dashboard", dashboardRoutes);
//Middleware de errores
app.use(errorMiddleware);

// Puerto
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
