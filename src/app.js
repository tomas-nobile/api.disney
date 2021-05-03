import express from "express";
import morgan from "morgan";
import "./database/associations";
import sequelize from "./database/database";
import showsRoutes from "./routes/shows";
import charactersRoutes from "./routes/characters";
import usersRoutes from "./routes/users";
import auth from './middlewares/auth';
import upload from './middlewares/upload'
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 4001;

/*============================================
ANCHOR Middlewares
=============================================*/
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/*============================================
ANCHOR Routes
=============================================*/
app.use("/api/shows", auth, upload, showsRoutes);
app.use("/api/characters", auth, upload, charactersRoutes);
app.use("/api/auth", usersRoutes);

/*============================================
ANCHOR Server & database
=============================================*/
app.listen(PORT, function() {
    console.log(`Started on port ${PORT}`);

    sequelize
        .sync({ force: false })
        .then(() => {
            console.log("DB connected");
        })
        .catch((e) => {
            console.log("ERROR\n", e);
        });
});

export default app;