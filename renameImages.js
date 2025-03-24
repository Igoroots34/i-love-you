import fs from "fs";
import path from "path";

const imagesDir = path.join(process.cwd(), "public", "images");

fs.readdir(imagesDir, (err, files) => {
  if (err) {
    console.error("Erro ao ler a pasta de imagens:", err);
    return;
  }

  let counter = 1;
  files.forEach((file) => {
    const ext = path.extname(file);
    const newName = `foto${counter}${ext}`;
    const oldPath = path.join(imagesDir, file);
    const newPath = path.join(imagesDir, newName);

    fs.rename(oldPath, newPath, (renameErr) => {
      if (renameErr) {
        console.error(`Erro ao renomear ${file} para ${newName}:`, renameErr);
      } else {
        console.log(`${file} renomeado para ${newName}`);
      }
    });

    counter++;
  });
});
