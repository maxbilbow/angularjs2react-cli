import type {ConvertOptions} from '@ng2react/core'

export interface CliArgs {
    quiet?: true
    cwd: string
    file: string
    verbose?: true
    json?: true
}

export type FindComponentArgs = CliArgs

export type ConvertComponentArgs = CliArgs & ConvertOptions
