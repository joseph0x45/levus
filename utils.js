import chalk from "chalk";

export function generateComponentTree(component, indent = 0) {
  const indentString = '  '.repeat(indent);

  console.log(indentString + chalk.bold(component.name));

  if (component.layouts && component.layouts.length > 0) {
    console.log(indentString + '  - ' + chalk.bold('Layouts'));
    component.layouts.forEach((layout) => {
      console.log(indentString + '    - ' + chalk.green(layout.name) + ': ' + layout.description);
    });
  }

  if (component.ui && component.ui.length > 0) {
    console.log(indentString + '  - ' + chalk.bold('UI'));
    component.ui.forEach((uiComponent) => {
      console.log(indentString + '    - ' + chalk.blue(uiComponent.name) + ': ' + uiComponent.description);
    });
  }

  if (component.subcomponents && component.subcomponents.length > 0) {
    component.subcomponents.forEach((subcomponent) => {
      generateComponentTree(subcomponent, indent + 1);
    });
  }
}
