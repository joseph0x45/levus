#!/usr/bin/env node

import svelte from "./svelte.js";
import { log } from "console"
import { generateComponentTree, framework_exists, init } from "./utils.js";
import select from "@inquirer/select";

const frameworks = {
    svelte
}

const args = process.argv

if (args[2] === "help") {
    log("Help this nigga")
}

if (args[2] === "init") {
    await init()
}


if (args[2] === "ls") {
    /**
        * @type { "svelte" }
    */
    let framework = args[3] ?? ""

    if (!frameworks[framework]) {
        log(framework === "" ? "Specify a framework." : "Invalid framework.")
        framework = await select({
            message: "Chose the framework",
            choices: [
                {
                    name: "Svelte",
                    value: "svelte"
                }
            ]
        })
    }
    generateComponentTree(frameworks[framework])

}

if (args[2] === "add") {

}





