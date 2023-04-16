#!/usr/bin/env node

import yargs, {argv} from 'yargs'
import {CliArgs, ConvertComponentArgs, FindComponentArgs} from '../cliArgs'
import findComponentsCmd from '../commands/findComponentsCmd'
import convertComponentsCmd from '../commands/convertComponentsCmd'
import {onError} from '../io/writeOutput'
import middleware from '../middleware'

process.on('unhandledRejection', (reason) => {
    onError(reason)
    process.exit(1)
})

process.on('uncaughtException', (error) => {
    onError(error)
    process.exit(1)
})

yargs
    .scriptName('ng2react')
    .middleware(middleware(), true)
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
        type: 'boolean'
    })
    .option('json', {
        describe: 'Outputs the result as json. ' +
            'When provided, all responses will be in the format {data: any, error?: string}',
        type: 'boolean'
    })
    .option('verbose', {
        describe: 'Outputs more information',
        type: 'boolean',
        conflicts: 'quiet'
    })
    .strict()
    .help()
    .parse()
