import type { ConvertOptions } from '@ng2react/core'
import {ReactTestOptions} from '@ng2react/core/src/lib/modules/openai-conversion/react-test-gen'

export interface CliArgs {
    cwd: string
    file: string
    verbose?: true
    quiet?: true
}

export type FindComponentArgs = CliArgs

export type ConvertComponentArgs = CliArgs & ConvertOptions

export type GenerateTestArgs = CliArgs & ReactTestOptions