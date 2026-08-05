const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

function zipFiles(filePaths, outputZipPath) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputZipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => resolve(outputZipPath));
    output.on("error", (err) => reject(err));
    archive.on("error", (err) => reject(err));

    archive.pipe(output);

    filePaths.forEach((filePath) => {
      if (fs.existsSync(filePath)) {
        archive.file(filePath, { name: path.basename(filePath) });
      }
    });

    archive.finalize();
  });
}

module.exports = {
  zipFiles,
};