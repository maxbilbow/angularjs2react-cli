#!/usr/bin/env node

import {ConvertComponentArgs, FindComponentArgs, GenerateTestArgs, OptionName} from './cliArgs'
import convertCmd from './commands/convertCmd'
import searchCmd from './commands/searchCmd'
import {onError} from './io/writeOutput'
import middleware from './middleware'
import generateReactTestCmd from './commands/generateReactTestCmd'
import {Ng2RCommand} from './generated/Commands'
import type yargs from 'yargs'

process.on('unhandledRejection', (reason) => {
    onError(reason)
    process.exit(1)
})

process.on('uncaughtException', (error) => {
    onError(error)
    process.exit(1)
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
(require('yargs') as typeof yargs)
    .scriptName('ng2r')
    .middleware(middleware(), true)
    .command<FindComponentArgs>(
        'search <file>' satisfies `${Ng2RCommand} <file>`,
        'Finds angular components in a file',
        (yargs) =>
            yargs.positional('file', {
                describe: 'The file to search',
                type: 'string',
            }),
        searchCmd
    )
    .command<ConvertComponentArgs>(
        'convert <file> <componentName>' satisfies `${Ng2RCommand} <file> <componentName>`,
        'Converts angular components to react',
        (yargs) =>
            yargs
                .positional('file' satisfies OptionName, {
                    describe: 'The file containing the component',
                    type: 'string',
                })
                .positional('componentName', {
                    describe: 'The file to convert',
                    type: 'string',
                })
                .option('apiKey' satisfies OptionName, {
                    describe: 'The openai api key',
                    type: 'string',
                    default: process.env.OPENAI_API_KEY,
                })
                .option('model' satisfies OptionName, {
                    describe: 'The openai model to use',
                    type: 'string',
                    default: process.env.OPENAI_MODEL ?? 'gpt-4',
                })
                .option('organization' satisfies OptionName, {
                    describe: 'The openai model to use',
                    type: 'string',
                    default: process.env.OPENAI_ORGANIZATION,
                })
                .option('sourceRoot' satisfies OptionName, {
                    describe: 'The source root where all AngularJS JS and HTML are located',
                    type: 'string',
                })
                .option('temperature' satisfies OptionName, {
                    describe: 'The temperature to use when generating text, between 0 and 2',
                    type: 'number',
                    default: 0.2,
                })
                .option('customPrompt' satisfies OptionName, {
                    describe: 'Custom rules (Markdown) that will be used instead of the default rules regarding pattern conversion.',
                    type: 'string'
                })
                .option('targetLanguage' satisfies OptionName, {
                    describe: 'Target language for code generation. If none provided, the source language will be used.',
                    type: 'string',
                    choices: ['javascript', 'typescript']
                }),
        convertCmd
    )
    .command<GenerateTestArgs>(
        'generateReactTest <file>' satisfies `${Ng2RCommand} <file>`,
        'Converts angular components to react',
        (yargs) =>
            yargs
                .positional('file', {
                    describe: 'The file containing the component',
                    type: 'string',
                })
                .option('apiKey' satisfies OptionName, {
                    describe: 'The openai api key',
                    type: 'string',
                    default: process.env.OPENAI_API_KEY,
                })
                .option('model' satisfies OptionName, {
                    describe: 'The openai model to use',
                    type: 'string',
                    default: process.env.OPENAI_MODEL ?? 'gpt-4',
                })
                .option('organization' satisfies OptionName, {
                    describe: 'The openai model to use',
                    type: 'string',
                    default: process.env.OPENAI_ORGANIZATION,
                })
                .option('temperature' satisfies OptionName, {
                    describe: 'The temperature to use when generating text, between 0 and 2',
                    type: 'number',
                    default: 0.2,
                })
                .option('targetLanguage' satisfies OptionName, {
                    describe: 'Target language for code generation. If none provided, the source language will be used.',
                    type: 'string',
                    choices: ['javascript', 'typescript']
                }),
        generateReactTestCmd
    )
    .option('cwd' satisfies OptionName, {
        describe: 'The current working directory',
        type: 'string',
        default: process.cwd(),
    })
    .option('quiet', {
        describe: 'Suppresses all logging',
        type: 'boolean',
    })
    .option('verbose', {
        describe: 'Outputs more information',
        type: 'boolean',
        conflicts: 'quiet',
    })
    .strict()
    .help()
    .parse()
