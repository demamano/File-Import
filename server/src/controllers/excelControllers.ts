import { Request, Response } from 'express';
import XLSX from "xlsx";
import Item from "../models/fileModel";
export const FileUpload =  async (req:Request, res:Response) => {
  try {
    let data: unknown[] = [];
    if (!req.file) {
      return res.status(400).send({ message: "No file provided" });
    }

    const buffer = req.file.buffer;
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const jsonData: { any: any }[] = XLSX.utils.sheet_to_json(worksheet);
    // console.log(jsonData);
    res.status(200).send(jsonData);
    await Item.bulkCreate(jsonData);
  } catch (error) {
    res.status(500).send({ message: "Error importing Excel data", error });
  }
};

export const AddData = async (req:Request, res:Response) => {
  try {
    // Extract the data from the request body
    const { itemNo, description, rate, qty, amount, unit } = req.body;

    // Create a new Item instance with the extracted data
    const item = await Item.create({ itemNo, description, rate, qty, amount, unit });

    // Send the created item as the response
    res.send(item);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while creating the item');
  }
};
export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving items' });
  }
};

export const getItemById = async (req: Request, res: Response) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving item' });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const [updatedRows] = await Item.update(req.body, {
      where: { id: req.params.id },
    });

    if (updatedRows) {
      res.json({ message: 'Item updated successfully' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating item' });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const deletedRows = await Item.destroy({ where: { id: req.params.id } });

    if (deletedRows) {
      res.json({ message: 'Item deleted successfully' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item' });
  }
};



