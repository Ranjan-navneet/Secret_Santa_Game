import express from "express";
import upload from "../controller/diskStorage.js";
import CommonFunc from "../views/functionality.js";
import path from "path";
import fs from "fs";

const router = express.Router();
let commonService = new CommonFunc();

router.post("/upload_csv", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({
    message: "Uploaded Successfully",
    file: req.file.filename,
  });
});

router.get("/csv-data", async (req, res) => {
  try {
    const csvData = await commonService.read_csv(req, res);

    if (!csvData) {
      return res.status(404).json({ error: "No CSV data found" });
    }
    const filePath = path.join("csv_file", `csv_data_${Date.now()}.csv`);

    fs.writeFileSync(filePath, csvData, "utf8");

    res.json(csvData);
  } catch (error) {
    console.error("Error reading or saving CSV:", error);
    res.status(500).json({ error: "Failed to process CSV data" });
  }
});

export default router;
