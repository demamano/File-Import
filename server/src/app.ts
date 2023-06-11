import express from "express";
import sequelize from "./config/db";
import cors from "cors";
import fileRoute from "./routes/fileRouter"
import dotenv from "dotenv";


const app = express();
// sequelize.sync({alter:true})
dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/api', fileRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



