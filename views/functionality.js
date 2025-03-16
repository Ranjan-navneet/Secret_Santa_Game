import fs from "fs";
import readCSV from "../controller/fileRead.js";
import { Parser } from "json2csv";

class CommonFunc {
  constructor() {}

  async read_csv(req, res) {
    try {
      let self = new CommonFunc();
      const files = fs.readdirSync("csv_file");
      if (files.length === 0) {
        return res.status(400).json({ error: "No CSV files found" });
      }

      const latestFile = `csv_file/${files[files.length - 1]}`;
      console.log("Reading file:", latestFile);

      const data = await readCSV(latestFile);

      let employees = data.map((emp) => ({
        name: emp.Employee_Name,
        email: emp.Employee_EmailID,
      }));
      if (employees.length < 2) {
        return res
          .status(400)
          .json({ error: "Not enough employees to assign secret children." });
      }
      let assignments = assignSecretSanta(employees);
      const csvData = convertToCSV(assignments);
      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=secret_santa_assignments.csv"
      );
      return csvData;
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

function assignSecretSanta(employees) {
  let availableChildren = [...employees];
  let assignments = [];
  shuffleArray(availableChildren);

  for (let i = 0; i < employees.length; i++) {
    let employee = employees[i];
    let childIndex = findValidChildIndex(availableChildren, employee);

    if (childIndex === -1) {
      console.log("No child Left");
      return assignSecretSanta(employees);
    }

    let chosenChild = availableChildren.splice(childIndex, 1)[0];

    assignments.push({
      Employee_Name: employee.name,
      Employee_EmailID: employee.email,
      Secret_Child_Name: chosenChild.name,
      Secret_Child_EmailID: chosenChild.email,
    });
  }

  return assignments;
}

function findValidChildIndex(availableChildren, employee) {
  for (let i = 0; i < availableChildren.length; i++) {
    if (availableChildren[i].email !== employee.email) {
      return i;
    }
  }
  return -1;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function convertToCSV(assignments) {
  const fields = [
    "Employee_Name",
    "Employee_EmailID",
    "Secret_Child_Name",
    "Secret_Child_EmailID",
  ];
  const json2csvParser = new Parser({ fields });
  return json2csvParser.parse(assignments);
}

export default CommonFunc;
