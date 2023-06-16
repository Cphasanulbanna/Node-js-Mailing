const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { consola, createConsola } = require("consola");

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => consola.info(`Server is running on port: ${PORT}`));
