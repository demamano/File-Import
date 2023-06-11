"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadExcel = void 0;
const service_1 = require("../services/service");
const uploadExcel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            throw new Error('File not uploaded');
            // console.log();
        }
        yield (0, service_1.importExcel)(req.file);
        res.status(201).send({ message: 'Excel file imported successfully!' });
    }
    catch (error) {
        res.status(500).send({ message: 'Failed to import Excel file.' });
        console.log("logged in");
    }
});
exports.uploadExcel = uploadExcel;
// Other CRUD controller functions (get, delete, update)
