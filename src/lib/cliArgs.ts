import type {ConvertOptions} from '@ng2react/core'
import {ReactTestOptions} from '@ng2react/core/src/lib/modules/openai-conversion/react-test-gen'
import {Ng2RCommonOptions, Ng2RConvertOptions, Ng2RTestGenerationOptions} from './generated/CliArgs'
import {Ng2ROption} from './generated/Options'

export interface CliArgs extends Ng2RCommonOptions {
    verbose?: true
    quiet?: true
}

export type FindComponentArgs = CliArgs

export type ConvertComponentArgs = CliArgs & ConvertOptions & Ng2RConvertOptions

export type GenerateTestArgs = CliArgs & ReactTestOptions & Ng2RTestGenerationOptions

export type OptionName = Ng2ROption extends `--${infer Name}` ? Name : never