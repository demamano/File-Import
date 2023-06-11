import  express  from 'express';
const router = express.Router();
import multer from 'multer';
// // import  upload  from '../config/multer';
import  {FileUpload,AddData,getAllItems,getItemById,updateItem,deleteItem}  from '../controllers/excelControllers';
const upload = multer({ storage: multer.memoryStorage() });
router.post('/upload', upload.single('fileName'), FileUpload);
router.post("/add",AddData);
router.get("/data",getAllItems);
router.get("/data/:id",getItemById);
router.put("/data/:id",updateItem);
router.delete("/delete:id",deleteItem);


export default router;
























// import express from 'express';
// import  yourController  from '../controllers/excelControllers';
// import upload from '../config/multer';
// // let path = __dirname + ''

// export const router = express.Router();

// router.get('/data', yourController.getData);
// router.post('/data', upload.single("file"),yourController);
// router.put('/data/:id', yourController.updateData);
// router.delete('/data/:id', yourController.deleteData);
// router.post('/upload', upload.single("file"), uploadFile);

// Other CRUD routes (get, delete, put)
// const upload = multer({ storage });

// const router = Router();
