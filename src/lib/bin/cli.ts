#!/usr/bin/env node

import yargs from 'yargs'
import {findComponents, resolveTemplates, createReactComponent} from '@maxbilbow/angularjs2react'
import path from 'path'
import fs from 'fs'
import getOutputFilePath from '../get-output-path.js';

yargs(process.argv)
    .scriptName('angularjs2react')
    .command<{ filename: string, cwd: string }>('convert <filename>',
        'Converts angular components to react',
        (yargs) => yargs
            .positional('filename', {
                describe: 'The file to convert',
                type: 'string'
            }),
        (argv) => {
            console.log('Converting angular components to react')
            argv.filename = path.resolve(argv.cwd, argv.filename)
            let components = findComponents(argv.filename)
            components = resolveTemplates(components)
            for (const component of components) {
                const fileName = getOutputFilePath(component)
                const reactSource = createReactComponent(component)
                fs.writeFileSync(fileName, reactSource.getText())
            }
        })
    .options('cwd', {
        describe: 'The current working directory',
        type: 'string',
        default: process.cwd()
    })
    .strict()
    .help()
    .parse()