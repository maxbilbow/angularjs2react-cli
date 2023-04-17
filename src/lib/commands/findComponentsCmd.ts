import {createAst, findComponents} from '@ng2react/core'
import {CliArgs} from '../cliArgs.ts'
import * as path from 'https://deno.land/std@0.183.0/path/mod.ts'
import {onComplete} from '../io/writeOutput.ts'

export default function findComponentsCmd({filename, cwd}: CliArgs): void {
    const ast = createAst(path.resolve(cwd, filename))
    const components = findComponents(ast)
    if (!components) {
        throw Error(`Could not find components in ${filename}`)
    }
    const componentNames = components.map(c => ({name: c.name}))
    onComplete({result: componentNames})
}