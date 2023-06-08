import chalk from "chalk";

export function generateComponentTree(component, indent = 0) {
    const indentString = '│  '.repeat(indent);
    const lineCharacter = indent === 0 ? '' : '├─ ';

    console.log(indentString + lineCharacter + chalk.bold(component.name));

    if (component.layouts && component.layouts.length > 0) {
        console.log(indentString + '│  ' + chalk.yellow.bold('Layouts'));
        component.layouts.forEach((layout, index) => {
            const isLast = index === component.layouts.length - 1;
            const layoutCharacter = isLast ? '└─ ' : '├─ ';
            console.log(indentString + '│  ' + layoutCharacter + chalk.green(layout.name) + ': ' + chalk.gray(layout.description));
        });
    }

    if (component.ui && component.ui.length > 0) {
        console.log(indentString + '│  ' + chalk.yellow.bold('UI'));
        component.ui.forEach((uiComponent, index) => {
            const isLast = index === component.ui.length - 1;
            const uiCharacter = isLast ? '└─ ' : '├─ ';
            console.log(indentString + '│  ' + uiCharacter + chalk.blue(uiComponent.name) + ': ' + chalk.gray(uiComponent.description));
        });
    }

    if (component.subcomponents && component.subcomponents.length > 0) {
        component.subcomponents.forEach((subcomponent, index) => {
            const isLast = index === component.subcomponents.length - 1;
            const subComponentCharacter = isLast ? '└─ ' : '├─ ';
            generateComponentTree(subcomponent, indent + 1);
        });
    }
}

/**
    * @param framework {string}
    * @param frameworks {Record<string, string>}
    * @returns {boolean}
    * */
export function framework_exists(framework, frameworks) {
    return frameworks.includes(framework)
}
