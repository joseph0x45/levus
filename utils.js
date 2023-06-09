import chalk from "chalk";
import fs from "fs-extra";
import path from "path";

/**
 * @typedef {Object} ComponentDetails
 * @property {string} name - The name of the component.
 * @property {string} description - The description of the component.
 */

/**
 * Generates a tree-like representation of the components within a framework.
 *
 * @param {Object} framework - The framework object containing component details.
 * @param {number} [indent=0] - The indentation level for the tree structure.
 * @returns {void}
 */
export function generateComponentTree(framework, indent = 0) {
  const indentString = "│  ".repeat(indent);
  const lineCharacter = indent === 0 ? "" : "├─ ";

  console.log(
    indentString + lineCharacter + chalk.bold(`${framework.name} components`)
  );

  if (framework.component_groups && framework.component_groups.length > 0) {
    framework.component_groups.forEach((group) => {
      console.log(indentString + "│  " + chalk.yellow.bold(group.name));

      group.components.forEach((component, index) => {
        const isLast = index === group.components.length - 1;
        const componentCharacter = isLast ? "└─ " : "├─ ";

        console.log(
          indentString +
            "│  " +
            componentCharacter +
            chalk.cyan(component.name) +
            ": " +
            chalk.gray(component.description)
        );
      });
    });
  }

  if (framework.subcomponents && framework.subcomponents.length > 0) {
    framework.subcomponents.forEach((subcomponent, index) => {
      const isLast = index === framework.subcomponents.length - 1;
      const subComponentCharacter = isLast ? "└─ " : "├─ ";
      generateComponentTree(subcomponent, indent + 1);
    });
  }
}

/**
 * Checks if a framework exists in the provided list of frameworks.
 * @param framework {string}
 * @param frameworks {Record<string, string>}
 * @returns {boolean}
 * */
export function framework_exists(framework, frameworks) {
  return frameworks.includes(framework);
}

/**
 * Extracts data object from a component file.
 * @param {string} filePath - The path to the component file.
 * @returns {ComponentDetails|null} - The extracted data object, or null if not found or an error occurred.
 */
export function extractDataFromComponent(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const match = fileContent.match(/export const details = ({[\s\S]*?});/);

  if (match && match[1]) {
    const dataString = match[1];
    try {
      /**
       * @type {ComponentDetails[]}
       */
      const data = eval(`(${dataString})`);
      return data;
    } catch (error) {
      console.error(`Error parsing data from file: ${filePath}`);
    }
  }

  return null;
}

/**
 * Retrieves details of components belonging to a specific group from the given path.
 * @param {string} path_ - The base path where the components are located.
 * @param {string} groupName - The name of the group to filter components.
 * @returns {ComponentDetails[]} - An array of component details belonging to the specified group.
 */
export function getComponentsDetailsByGroup(path_, groupName) {
  const componentsPath = path.join(path_, groupName);

  /**
   * @type {ComponentDetails[]}
   */
  let groupDetails = [];

  // Get the list of UI component files
  const componentFiles = fs.readdirSync(componentsPath);

  // Iterate over each component file
  componentFiles.forEach((fileName) => {
    const filePath = path.join(componentsPath, fileName);
    if (fs.statSync(filePath).isFile()) {
      const data = extractDataFromComponent(filePath);
      if (data) {
        groupDetails.push(data);
      }
    }
  });

  return groupDetails;
}
