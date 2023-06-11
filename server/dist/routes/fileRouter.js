"use strict";
// import express from 'express';
// import  yourController  from '../controllers/excelControllers';
// import upload from '../config/multer';
// // let path = __dirname + ''
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// export const router = express.Router();
// router.get('/data', yourController.getData);
// router.post('/data', upload.single("file"),yourController);
// router.put('/data/:id', yourController.updateData);
// router.delete('/data/:id', yourController.deleteData);
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const excelControllers_1 = require("../controllers/excelControllers");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)();
router.post('/import', upload.single('excel'), excelControllers_1.uploadExcel);
// Other CRUD routes (get, delete, put)
exports.default = router;
