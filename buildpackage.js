/**
 * This is solely a build script, intended to prep the azure-devops-extension-api npm package for publishing.
 */

const { execSync } = require("child_process");
const fs = require("fs");
const glob = require("glob");
const path = require("path");
const copy = require("recursive-copy");
const shell = require("shelljs");
const UglifyES = require("uglify-es");

(async function() {

    // Clean bin directory
    console.log("# Cleaning bin. Running shelljs rm -rf ./bin");
    shell.rm("-rf", "./bin");

    // Compile typescript - CJS build
    console.log("# Compiling TypeScript (CJS). Executing `node_modules\\.bin\\tsc -p ./tsconfig.json`.");
    try {
        execSync("node_modules\\.bin\\tsc -p ./tsconfig.json", {
            stdio: [0, 1, 2],
            shell: true,
            cwd: __dirname,
        });
    } catch (error) {
        console.log("ERROR: Failed to build TypeScript (CJS).");
        process.exit(1);
    }

    // Compile typescript - ESM build
    console.log("# Compiling TypeScript (ESM). Executing `node_modules\\.bin\\tsc -p ./tsconfig.esm.json`.");
    try {
        execSync("node_modules\\.bin\\tsc -p ./tsconfig.esm.json", {
            stdio: [0, 1, 2],
            shell: true,
            cwd: __dirname,
        });
    } catch (error) {
        console.log("ERROR: Failed to build TypeScript (ESM).");
        process.exit(1);
    }

    // Copy ts files to bin
    console.log("# Copy declare files to bin.");
    try {
        await copy(path.join(__dirname, "src"), path.join(__dirname, "bin"), {
            filter: f => {
                return f.endsWith(".d.ts");
            },
        });
    } catch (e) {
        console.log("Copy failed. " + e);
    }

    // Uglify JavaScript (CJS)
    console.log("# Minifying CJS JS using the UglifyES API, replacing un-minified files.");
    let cjsCount = 0;

    const cjsFiles = await new Promise((resolve, reject) => {
        glob("./bin/**/*.js", { ignore: "./bin/esm/**" }, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    });

    for (const file of cjsFiles) {
        if (file.includes("node_modules/")) {
            continue;
        }
        fs.writeFileSync(
            file.substr(0, file.length - 2) + "min.js",
            UglifyES.minify(fs.readFileSync(file, "utf-8"), { compress: true, mangle: true }).code,
            "utf-8",
        );
        cjsCount++;
    }
    console.log(`-- Minified ${cjsCount} CJS files.`);

    // Uglify JavaScript (ESM)
    console.log("# Minifying ESM JS using the UglifyES API, replacing un-minified files.");
    let esmCount = 0;

    const esmFiles = await new Promise((resolve, reject) => {
        glob("./bin/esm/**/*.js", (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    });

    for (const file of esmFiles) {
        if (file.includes("node_modules/")) {
            continue;
        }
        fs.writeFileSync(
            file.substr(0, file.length - 2) + "min.js",
            UglifyES.minify(fs.readFileSync(file, "utf-8"), { compress: true, mangle: true }).code,
            "utf-8",
        );
        esmCount++;
    }
    console.log(`-- Minified ${esmCount} ESM files.`);

    // Emit empty .js stubs for type-only .d.ts source files (e.g. Context.d.ts).
    // These have no runtime code, but index files re-export from them.
    // Only emits a stub when no .js was produced by tsc — if a .d.ts has a
    // corresponding .ts file, tsc already emits the .js and this is a no-op.
    // Runs after minification so stubs aren't needlessly passed through UglifyES.
    console.log("# Emitting stubs for type-only modules.");
    let stubCount = 0;
    const dtsSourceFiles = await new Promise((resolve, reject) => {
        glob("./src/**/*.d.ts", (err, files) => {
            err ? reject(err) : resolve(files);
        });
    });
    const cjsStub = '"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\n';
    const esmStub = "export {};\n";
    for (const dtsFile of dtsSourceFiles) {
        const relative = dtsFile.replace(/^\.\/src\//, "").replace(/\.d\.ts$/, ".js");
        const cjsTarget = path.join(__dirname, "bin", relative);
        const esmTarget = path.join(__dirname, "bin", "esm", relative);
        if (!fs.existsSync(cjsTarget)) {
            fs.mkdirSync(path.dirname(cjsTarget), { recursive: true });
            fs.writeFileSync(cjsTarget, cjsStub, "utf-8");
            stubCount++;
        }
        if (!fs.existsSync(esmTarget)) {
            fs.mkdirSync(path.dirname(esmTarget), { recursive: true });
            fs.writeFileSync(esmTarget, esmStub, "utf-8");
            stubCount++;
        }
    }
    console.log(`-- Emitted ${stubCount} stub(s).`);

    // Generate package.json with conditional exports
    console.log("# Generating package.json with conditional exports map.");
    const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "package.json"), "utf-8"));

    // Discover subpath exports by scanning src/ for directories with index.ts.
    // Each API area gets an explicit entry — no wildcard pattern, which has
    // inconsistent support across Node versions and bundlers.
    const exports = {
        ".": {
            "import": "./esm/index.js",
            "require": "./index.js",
            "types": "./index.d.ts"
        }
    };

    const srcDir = path.join(__dirname, "src");
    const entries = fs.readdirSync(srcDir, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.isDirectory() && fs.existsSync(path.join(srcDir, entry.name, "index.ts"))) {
            const subpath = "./" + entry.name;
            exports[subpath] = {
                "import": "./esm/" + entry.name + "/index.js",
                "require": "./" + entry.name + "/index.js",
                "types": "./" + entry.name + "/index.d.ts"
            };
        }
    }

    // "main" and "module" are fallbacks for older bundlers that don't support
    // the "exports" map (e.g. Webpack 4). Modern bundlers use "exports" exclusively.
    pkg.main = "./index.js";
    pkg.module = "./esm/index.js";
    pkg.types = "./index.d.ts";
    pkg.exports = exports;

    fs.writeFileSync(
        path.join(__dirname, "bin", "package.json"),
        JSON.stringify(pkg, null, 2),
        "utf-8",
    );

    // Copy LICENSE, README.md to bin
    console.log("# Copying LICENSE and README.md to bin.");
    try {
        await copy(path.join(__dirname, "LICENSE"), path.join(__dirname, "bin", "LICENSE"));
        await copy(path.join(__dirname, "README.md"), path.join(__dirname, "bin", "README.md"));
    } catch (error) {
        console.log("ERROR: Failed to copy LICENSE or README.md - " + error);
    }
})();