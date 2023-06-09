import { getComponentsDetailsByGroup } from "./utils.js";
import fs from "fs";
import path from "path";

const svelteComponentsPath = "./components/svelte";

const svelte = {
  path: svelteComponentsPath,
  import_path: "./src/lib/ui/levus",
  name: "Svelte",
};

// Read the subdirectories within the svelteComponentsPath
const subdirectories = fs.readdirSync(svelteComponentsPath, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

// Add a field for each subdirectory
subdirectories.forEach((subDirName) => {
  svelte[subDirName] = getComponentsDetailsByGroup(svelteComponentsPath, subDirName);
});

//TODO refactor this object to have a components_group array of each group of component

export default svelte;
