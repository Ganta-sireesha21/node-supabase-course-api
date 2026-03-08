const express = require('express');
const cors = require('cors');
import courseRoutes from "./routes/courses.js";
import logger from "./middleware/logger.js";

const app = express();
 
app.use(cors());
app.use(express.json());
app.use(logger);
app.use("/", courseRoutes);
app.listen(3000, () => {
    console.log("server running on port 3000");
})