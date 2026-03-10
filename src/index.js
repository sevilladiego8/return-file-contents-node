import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 8080;

const DATA_DIR = path.join(import.meta.dirname, "../data");
const CSV_DIR = path.join(DATA_DIR, "csv");

app.get("/*", async (req, res) => {
  try {
    let filePath;

    // console.log("path", req.path);
    filePath = `${DATA_DIR}/${req.path}`;

    const fileInfo = await fs.promises.stat(filePath);
    // console.log('fileInfo',fileInfo)

    if (!fileInfo.isFile()) {
      return res.status(404).send("File not found");
    }

    const content = await fs.promises.readFile(filePath, "utf8");
    // console.log(content)
    res.type(path.extname(filePath));

    res.send(content);
  } catch (err) {
    console.error(err)
    // if (err.code === "") { categorizing the error better
    return res.status(404).send("File not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
