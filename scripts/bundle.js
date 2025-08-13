import { execSync } from "node:child_process";
import { copyFile, rm, access, constants } from "node:fs/promises";
import { glob } from "glob";

const exists = (path) =>
  access(path, constants.F_OK)
    .then(() => true)
    .catch(() => false);

const removeDist = async () => {
  if (!(await exists("./dist"))) return Promise.resolve();
  return rm("./dist", { recursive: true });
};

const transpile = () =>
  new Promise((resolve, reject) => {
    try {
      const buffer = execSync("npx tsc -p ./tsconfig.bundle.json");
      process.stdout.write(buffer);
      resolve();
    } catch (e) {
      process.stdout.write("\n\n");
      process.stdout.write(e.stdout);
      process.stdout.write("\n\n");
      reject();
    }
  });

const copyCssFiles = async () => {
  const cssFiles = await glob("./src/**/*.css");

  const promises = cssFiles.map((path) => {
    copyFile(path, path.replace(/^src/, "dist"));
  });

  return Promise.all(promises);
};

const bundleTask = async ({ fn, text, error }) => {
  try {
    process.stdout.write(`ℹ️ ${text} ...`);
    await fn();
    process.stdout.write(`\r\x1b[K✅ ${text}\n`);
  } catch (e) {
    process.stdout.write(`\r\x1b[K❌ ${error}\n`);
    throw e;
  }
};

await bundleTask({
  fn: removeDist,
  text: "Removing ./dist",
  error: "./dist could not be removed",
});

await bundleTask({
  fn: transpile,
  text: "Transpiling typescript files",
  error: "Typescript files could not be transpiled",
});

await bundleTask({
  fn: copyCssFiles,
  text: "Copying css files",
  error: "Css files could not be copied",
});
