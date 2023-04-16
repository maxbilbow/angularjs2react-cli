#!/usr/bin/env node

import yargs from 'yargs'
import {ConvertComponentArgs, FindComponentArgs} from '../cliArgs'
import findComponentsCmd from '../commands/findComponentsCmd'
import convertComponentsCmd from '../commands/convertComponentsCmd'

yargs(process.argv)
    .scriptName('ng2react')
    .command<FindComponentArgs>('findComponents <filename>',
        'Finds angular components in a file',
        (yargs) => yargs
            .positional('filename', {
                describe: 'The file to search',
                type: 'string'
            }),
        findComponentsCmd
    )
    .command<ConvertComponentArgs>('convert <filename> <componentName>',
        'Converts angular components to react',
        (yargs) => yargs
            .positional('filename', {
                describe: 'The file containing the component',
                type: 'string'
            })
            .positional('componentName', {
                describe: 'The file to convert',
                type: 'string'
            }),
        convertComponentsCmd)
    .options('cwd', {
        describe: 'The current working directory',
        type: 'string',
        default: process.cwd()
    })
    .option('quiet', {
        describe: 'Suppresses all logging',
        type: 'boolean',
        default: false,
        alias: 'q'
    })
    .strict()
    .help()
    .parse()