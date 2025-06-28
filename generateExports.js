import { promises as fs } from "fs";

const srcDir = "src";
const esmDir = "esm";

// Read all subdirectories in src
const entries = await fs.readdir(srcDir, { withFileTypes: true });
const folders = entries.filter((e) => e.isDirectory()).map((e) => e.name);

// Base exports
const exportsField = {
  ".": {
    import: `./${esmDir}/index.js`,
    default: "./index.js",
  },
  "./*": {
    import: `./${esmDir}/*/index.js`,
    default: "./*/index.js",
  },
  "./package.json": "./package.json",
};

// Add exports for each subfolder
for (const folder of folders) {
  exportsField[`./${folder}/*`] = {
    import: `./${esmDir}/${folder}/*.js`,
    default: `./${folder}/*.js`,
  };
  exportsField[`./${folder}/*.js`] = {
    import: `./${esmDir}/${folder}/*.js`,
    default: `./${folder}/*.js`,
  };
}

// Update package.json
const pkgPath = "package.json";
const pkg = JSON.parse(await fs.readFile(pkgPath, "utf8"));
pkg.exports = exportsField;
await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2));

console.log("✅ package.json exports updated from src/");
