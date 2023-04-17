#!/usr/bin/env node

import { parse } from 'https://deno.land/std@0.183.0/flags/mod.ts'
import convertComponentsCmd from './commands/convertComponentsCmd.ts'
import findComponentsCmd from './commands/findComponentsCmd.ts'

const flags = parse(Deno.args, {
    boolean: ['quiet', 'json', 'verbose'],
    string: ['cwd'],
    default: {
        cwd: Deno.cwd()
    }
})

const [command, filename, componentName] = flags._ as [string, string, string]

if (command === 'findComponents') {
    await findComponentsCmd({filename, cwd: flags.cwd})
} else if (command === 'convert') {
    await convertComponentsCmd({filename, componentName, cwd: flags.cwd})
} else {
    console.error(`Invalid command: ${command}`)
    // await Deno.stderr.write(`Invalid command: ${command}`)
}
