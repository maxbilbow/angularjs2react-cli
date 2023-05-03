#!/usr/bin/env node

import yargs from 'yargs'
import { ConvertComponentArgs, FindComponentArgs } from '../cliArgs'
import convertCmd from '../commands/convertCmd'
import searchCmd from '../commands/searchCmd'
import { onError } from '../io/writeOutput'
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
    .command<FindComponentArgs>('search <file>',
        'Finds angular components in a file',
        (yargs) => yargs
            .positional('file', {
                describe: 'The file to search',
                type: 'string'
            }),
        searchCmd
    )
    .command<ConvertComponentArgs>('convert <file> <componentName>',
        'Converts angular components to react',
        (yargs) => yargs
            .positional('file', {
                describe: 'The file containing the component',
                type: 'string'
            })
            .positional('componentName', {
                describe: 'The file to convert',
                type: 'string'
            })
            .option('apiKey', {
                describe: 'The openai api key',
                type: 'string',
                default: process.env.OPENAI_API_KEY
            })
            .option('model', {
                describe: 'The openai model to use',
                type: 'string',
                default: process.env.OPENAI_MODEL ?? 'gpt-4'
            })
            .option('organization', {
                describe: 'The openai model to use',
                type: 'string',
                default: process.env.OPENAI_ORGANIZATION
            })
            .option('sourceRoot', {
                describe: 'The source root where all AngularJS JS and HTML are located',
                type: 'string'
            })
            .option('temperature', {
                describe: 'The temperature to use when generating text, between 0 and 2',
                type: 'number',
                default: 0.2,
            }),
        convertCmd)
    .option('cwd', {
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
