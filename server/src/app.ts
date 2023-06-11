import readXlsxFile from "read-excel-file/node";
import express from "express";
import sequelize from "./config/db";
import cors from "cors";
import fileRoute from "./routes/fileRouter"

const app = express();
// sequelize.sync({alter:true})
app.use(cors());
app.use(express.json());
app.use('/api', fileRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



