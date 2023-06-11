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
exports.importExcel = void 0;
const exceljs_1 = require("exceljs");
function importExcel(file) {
    return __awaiter(this, void 0, void 0, function* () {
        // Implement your import logic here
        const workbook = new exceljs_1.Workbook();
        yield workbook.xlsx.readFile(file.path);
        // Access the first worksheet
        const worksheet = workbook.getWorksheet(1);
        // Iterate through the rows and process your data
        worksheet.eachRow((row, rowIndex) => {
            // Skip the header row
            if (rowIndex === 1) {
                return;
            }
            // Process the row data
            console.log(`Row ${rowIndex}: ${JSON.stringify(row.values)}`);
        });
    });
}
exports.importExcel = importExcel;
// Other CRUD functions (get, delete, update)
