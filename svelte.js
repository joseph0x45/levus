import { getComponentsDetailsByGroup } from "./utils.js";
import fs from "fs";

const svelteComponentsPath = "./components/svelte";

const svelte = {
  path: svelteComponentsPath,
  import_path: "./src/lib/ui/levus",
  name: "Svelte",
  component_groups: []
};

// Read the subdirectories within the svelteComponentsPath
const subdirectories = fs.readdirSync(svelteComponentsPath, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

// Add components to each group in the component_groups array
subdirectories.forEach((subDirName) => {
  const groupComponents = getComponentsDetailsByGroup(svelteComponentsPath, subDirName);
  svelte.component_groups.push({
    name: subDirName,
    components: groupComponents
  });
});

export default svelte;
