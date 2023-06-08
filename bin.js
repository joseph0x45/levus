#!/usr/bin/env node

import svelte from "./svelte.js";
import { log } from "console"
import { generateComponentTree } from "./utils.js";

const frameworks = {
    svelte
}

const args = process.argv

if (args[2] === "help") {
    log("Help this nigga")
}

//npx levus ls
if (args[2] === "ls") {
    /**
        * @type { "svelte" }
    */
    const framework = args[3] ?? ""
    if (framework === "") {
        log("Specify a framework. Available ones are svelte")
        process.exit(1)
    }
    if(!frameworks[framework] ) {
        log("Invalid framework")
        process.exit(1)
    }
    generateComponentTree(frameworks[framework])

}

//npx levus add
if (args[2] === "add") {

}
